import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import Complaint, StatusLog
from app.schemas import ComplaintCreate, StatusUpdate
from app.ai.classifier import (
    predict_category,
    predict_urgency,
    predict_department
)

router = APIRouter()

@router.post("/complaint")
def submit_complaint(complaint: ComplaintCreate):
    db = SessionLocal()
    try:
        text = f"{complaint.title} {complaint.description}"
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
            user_id=complaint.user_id
        )
        db.add(new_complaint)
        db.commit()
        db.refresh(new_complaint)
        return {
            "message": "Complaint submitted successfully",
            "id": new_complaint.id,
            "category": category,
            "urgency": urgency,
            "department": department_name,
            "status": "Pending"
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
            query = query.filter(
                Complaint.status == status
            )
        if district:
            query = query.filter(
                Complaint.district == district
            )
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
            query = query.filter(
                Complaint.district == district
            )
        return query.all()
    finally:
        db.close()

@router.get("/complaint/{complaint_id}")
def get_complaint(complaint_id: int):
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
        return complaint
    finally:
        db.close()

@router.put("/complaint/{complaint_id}/status")
def update_status(
    complaint_id: int,
    body: StatusUpdate
):
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