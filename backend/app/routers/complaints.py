from fastapi import APIRouter, HTTPException, Request
from app.database import SessionLocal
from app.models import Complaint, StatusLog, ComplaintReporter
from app.schemas import StatusUpdate
from app.ai.classifier import (
    predict_category,
    predict_urgency,
    predict_department,
    check_duplicate
)

import os
import shutil
from uuid import uuid4

router = APIRouter()

VALID_DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"]

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_uploaded_image(image):
    if not image or not getattr(image, "filename", None):
        return None

    file_extension = os.path.splitext(image.filename)[1]
    unique_filename = f"{uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return f"/uploads/{unique_filename}"


@router.post("/complaint")
async def submit_complaint(request: Request):
    content_type = request.headers.get("content-type", "")

    image = None

    if "multipart/form-data" in content_type:
        form = await request.form()

        title = form.get("title")
        description = form.get("description")
        district = form.get("district")
        area = form.get("area")
        user_id = form.get("user_id")
        image = form.get("image")

    else:
        data = await request.json()

        title = data.get("title")
        description = data.get("description")
        district = data.get("district")
        area = data.get("area")
        user_id = data.get("user_id")

    if not title or not title.strip():
        raise HTTPException(
            status_code=400,
            detail="Title cannot be empty"
        )

    if not description or not description.strip():
        raise HTTPException(
            status_code=400,
            detail="Description cannot be empty"
        )

    if district not in VALID_DISTRICTS:
        raise HTTPException(
            status_code=400,
            detail=f"District must be one of {VALID_DISTRICTS}"
        )

    try:
        user_id = int(user_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Valid user_id is required"
        )

    db = SessionLocal()

    try:
        text = f"{title} {description}"

        existing_complaints = db.query(Complaint).filter(
            Complaint.district == district,
            Complaint.status != "Resolved"
        ).all()

        try:
            duplicate = check_duplicate(text, existing_complaints)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Duplicate checking failed: {str(e)}"
            )

        if duplicate:
            original = db.query(Complaint).filter(
                Complaint.id == duplicate.id
            ).first()

            if not original:
                raise HTTPException(
                    status_code=404,
                    detail="Original complaint not found"
                )

            original.report_count = (original.report_count or 0) + 1

            reporter_entry = ComplaintReporter(
                complaint_id=original.id,
                user_id=user_id
            )

            db.add(reporter_entry)
            db.commit()
            db.refresh(original)

            return {
                "message": "Similar complaint already exists. Your report has been linked to it.",
                "id": original.id,
                "category": original.category,
                "urgency": original.urgency,
                "department": original.department_name,
                "status": original.status,
                "duplicate_warning": True,
                "similar_to_id": original.id,
                "report_count": original.report_count,
                "image_url": original.image_url
            }

        try:
            category = predict_category(text)
            urgency = predict_urgency(text)
            department_name = predict_department(category)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"AI classification failed: {str(e)}"
            )

        image_url = save_uploaded_image(image)

        new_complaint = Complaint(
            title=title,
            description=description,
            district=district,
            area=area,
            category=category,
            urgency=urgency,
            department_name=department_name,
            status="Pending",
            report_count=1,
            user_id=user_id,
            image_url=image_url
        )

        db.add(new_complaint)
        db.commit()
        db.refresh(new_complaint)

        reporter_entry = ComplaintReporter(
            complaint_id=new_complaint.id,
            user_id=user_id
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
            "report_count": 1,
            "image_url": image_url
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


@router.get("/complaints/mine")
def get_my_complaints(user_id: int):
    db = SessionLocal()

    try:
        reported_ids = db.query(
            ComplaintReporter.complaint_id
        ).filter(
            ComplaintReporter.user_id == user_id
        ).all()

        ids = [item[0] for item in reported_ids]

        if not ids:
            return []

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
        status_counts = {
            "Pending": 0,
            "In Progress": 0,
            "Resolved": 0
        }

        for complaint in complaints:
            category = complaint.category or "General"
            district = complaint.district or "Unknown"
            status = complaint.status or "Pending"

            category_counts[category] = category_counts.get(category, 0) + 1
            district_counts[district] = district_counts.get(district, 0) + 1
            status_counts[status] = status_counts.get(status, 0) + 1

        return {
            "total": len(complaints),
            "by_category": [
                {"category": category, "count": count}
                for category, count in category_counts.items()
            ],
            "by_district": [
                {"district": district, "count": count}
                for district, count in district_counts.items()
            ],
            "by_status": [
                {"name": status, "value": count}
                for status, count in status_counts.items()
            ]
        }

    finally:
        db.close()