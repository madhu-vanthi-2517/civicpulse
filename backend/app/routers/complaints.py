from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.models import Complaint, StatusLog, User
from app.schemas import ComplaintCreate, StatusUpdate
from app.ai.classifier import (
    predict_category,
    predict_urgency,
    predict_department
)

router = APIRouter()


@router.post("/complaint")
def submit_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    try:
        if complaint.user_id is not None:
            user = db.query(User).filter(
                User.id == complaint.user_id
            ).first()

            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found. Register user first or remove user_id."
                )

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
            "status": new_complaint.status
        }

    except HTTPException:
        raise

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )


@router.get("/complaints")
def get_complaints(
    status: str = None,
    district: str = None,
    department: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Complaint)

    if status:
        query = query.filter(Complaint.status == status)

    if district:
        query = query.filter(Complaint.district == district)

    if department:
        query = query.filter(Complaint.department_name == department)

    return query.all()


@router.get("/complaints/public")
def get_public_complaints(
    district: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Complaint)

    if district:
        query = query.filter(Complaint.district == district)

    return query.all()


@router.get("/complaint/{complaint_id}")
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return complaint


@router.put("/complaint/{complaint_id}/status")
def update_status(
    complaint_id: int,
    body: StatusUpdate,
    db: Session = Depends(get_db)
):
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
    db.refresh(complaint)

    return {
        "message": "Status updated successfully",
        "id": complaint_id,
        "old_status": old_status,
        "new_status": body.status
    }


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
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

        if status in status_counts:
            status_counts[status] += 1
        else:
            status_counts[status] = 1

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