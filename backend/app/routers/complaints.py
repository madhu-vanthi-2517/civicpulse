from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import Complaint, StatusLog, ComplaintReporter
from app.schemas import ComplaintCreate, StatusUpdate
from app.ai.classifier import (
    predict_category,
    predict_urgency,
    predict_department,
    check_duplicate
)

router = APIRouter()

VALID_DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"]

@router.post("/complaint")
def submit_complaint(complaint: ComplaintCreate):
    if complaint.district not in VALID_DISTRICTS:
        raise HTTPException(
            status_code=400,
            detail=f"District must be one of {VALID_DISTRICTS}"
        )

    db = SessionLocal()
    try:
        text = f"{complaint.title} {complaint.description}"

        existing = db.query(Complaint).filter(
            Complaint.district == complaint.district,
            Complaint.status != "Resolved"
        ).all()

        existing_list = [
            {"id": c.id, "description": f"{c.title} {c.description}"}
            for c in existing
        ]

        duplicate = check_duplicate(text, existing_list)

        # ---- DUPLICATE FOUND: merge instead of creating new row ----
        if duplicate:
            original = db.query(Complaint).filter(
                Complaint.id == duplicate["id"]
            ).first()

            original.report_count += 1

            reporter_entry = ComplaintReporter(
                complaint_id=original.id,
                user_id=complaint.user_id
            )
            db.add(reporter_entry)
            db.commit()
            db.refresh(original)

            return {
                "message": "Similar complaint already exists. "
                            "Your report has been linked to it.",
                "id": original.id,
                "category": original.category,
                "urgency": original.urgency,
                "department": original.department_name,
                "status": original.status,
                "duplicate_warning": True,
                "similar_to_id": original.id,
                "report_count": original.report_count
            }

        # ---- NO DUPLICATE: create new complaint normally ----
        category = predict_category(text)
        urgency = predict_urgency(text)
        department_name = predict_department(category)

        new_complaint = Complaint(
            title=complaint.title,
            description=complaint.description,
            district=complaint.district,
            area=complaint.area,
            category=category,
            urgency=urgency,
            department_name=department_name,
            status="Pending",
            report_count=1,
            user_id=complaint.user_id
        )
        db.add(new_complaint)
        db.commit()
        db.refresh(new_complaint)

        # Track the original submitter too
        reporter_entry = ComplaintReporter(
            complaint_id=new_complaint.id,
            user_id=complaint.user_id
        )
        db.add(reporter_entry)
        db.commit()

        return {
            "message": "Complaint submitted successfully",
            "id": new_complaint.id,
            "category": category,
            "urgency": urgency,
            "department": department_name,
            "status": "Pending",
            "duplicate_warning": False,
            "report_count": 1
        }
    finally:
        db.close()


@router.get("/complaints")
def get_complaints(
    status: str = None,
    district: str = None,
    department: str = None
):
    db = SessionLocal()
    try:
        query = db.query(Complaint)
        if status:
            query = query.filter(Complaint.status == status)
        if district:
            query = query.filter(Complaint.district == district)
        if department:
            query = query.filter(
                Complaint.department_name == department
            )
        return query.all()
    finally:
        db.close()


@router.get("/complaints/public")
def get_public_complaints(district: str = None):
    db = SessionLocal()
    try:
        query = db.query(Complaint)
        if district:
            query = query.filter(Complaint.district == district)
        return query.all()
    finally:
        db.close()


# ---- NEW: citizen's own complaints, including merged ones ----
@router.get("/complaints/mine")
def get_my_complaints(user_id: int):
    db = SessionLocal()
    try:
        reported_ids = db.query(
            ComplaintReporter.complaint_id
        ).filter(
            ComplaintReporter.user_id == user_id
        ).all()
        ids = [r[0] for r in reported_ids]

        complaints = db.query(Complaint).filter(
            Complaint.id.in_(ids)
        ).all()
        return complaints
    finally:
        db.close()


@router.get("/complaint/{complaint_id}")
def get_complaint(complaint_id: int):
    db = SessionLocal()
    try:
        if complaint_id <= 0:
            raise HTTPException(
                status_code=400,
                detail="Invalid complaint ID"
            )
        complaint = db.query(Complaint).filter(
            Complaint.id == complaint_id
        ).first()
        if not complaint:
            raise HTTPException(
                status_code=404,
                detail="Complaint not found"
            )
        return complaint
    finally:
        db.close()


@router.put("/complaint/{complaint_id}/status")
def update_status(complaint_id: int, body: StatusUpdate):
    db = SessionLocal()
    try:
        complaint = db.query(Complaint).filter(
            Complaint.id == complaint_id
        ).first()
        if not complaint:
            raise HTTPException(
                status_code=404,
                detail="Complaint not found"
            )
        old_status = complaint.status
        complaint.status = body.status

        log = StatusLog(
            complaint_id=complaint_id,
            old_status=old_status,
            new_status=body.status,
            remarks=body.remarks
        )
        db.add(log)
        db.commit()
        return {
            "message": "Status updated successfully",
            "id": complaint_id,
            "old_status": old_status,
            "new_status": body.status
        }
    finally:
        db.close()


@router.get("/analytics")
def get_analytics():
    db = SessionLocal()
    try:
        complaints = db.query(Complaint).all()

        category_counts = {}
        district_counts = {}
        status_counts = {"Pending": 0, "In Progress": 0, "Resolved": 0}

        for c in complaints:
            category_counts[c.category] = category_counts.get(c.category, 0) + 1
            district_counts[c.district] = district_counts.get(c.district, 0) + 1
            if c.status in status_counts:
                status_counts[c.status] += 1

        return {
            "total": len(complaints),
            "by_category": [
                {"category": k, "count": v}
                for k, v in category_counts.items()
            ],
            "by_district": [
                {"district": k, "count": v}
                for k, v in district_counts.items()
            ],
            "by_status": [
                {"name": k, "value": v}
                for k, v in status_counts.items()
            ]
        }
    finally:
        db.close()