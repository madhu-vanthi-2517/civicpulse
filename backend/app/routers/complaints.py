import mimetypes
import os
import shutil
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse
from app.database import SessionLocal
from app.dependencies import get_current_user, require_authority, require_citizen
from app.models import Complaint, ComplaintReporter, User
from app.schemas import StatusUpdate
from app.ai.classifier import (
    is_valid_complaint_text,
    predict_category,
    predict_urgency,
    predict_department,
    check_duplicate
)

router = APIRouter()

VALID_DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"]

UPLOAD_DIR = os.path.abspath("uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_uploaded_image(image):
    if image is None or not getattr(image, "filename", None):
        return None

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_extension = os.path.splitext(image.filename)[1]
    unique_filename = f"{uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return f"/uploads/{unique_filename}"


@router.post("/complaint")
async def submit_complaint(
    request: Request,
    current_user: User = Depends(require_citizen),
):
    content_type = request.headers.get("content-type", "")

    image = None

    if "multipart/form-data" in content_type:
        form = await request.form()

        title = form.get("title")
        description = form.get("description")
        district = form.get("district")
        area = form.get("area")
        image = form.get("image")

    else:
        data = await request.json()

        title = data.get("title")
        description = data.get("description")
        district = data.get("district")
        area = data.get("area")

    if not title or not str(title).strip():
        raise HTTPException(
            status_code=400,
            detail="Title cannot be empty"
        )

    if not description or not str(description).strip():
        raise HTTPException(
            status_code=400,
            detail="Description cannot be empty"
        )

    complaint_text = f"{title} {description}"
    if not is_valid_complaint_text(complaint_text):
        raise HTTPException(
            status_code=400,
            detail="Invalid complaint. Please enter a clear and meaningful issue description."
        )

    if district not in VALID_DISTRICTS:
        raise HTTPException(
            status_code=400,
            detail=f"District must be one of {VALID_DISTRICTS}"
        )

    db = SessionLocal()

    try:
        text = complaint_text

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
                user_id=current_user.id
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
            department_name = predict_department(category, text)
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
            user_id=current_user.id,
            image_url=image_url
        )

        db.add(new_complaint)
        db.commit()
        db.refresh(new_complaint)

        reporter_entry = ComplaintReporter(
            complaint_id=new_complaint.id,
            user_id=current_user.id
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

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        db.close()


@router.get("/complaints")
def get_complaints(
    status: str = None,
    district: str = None,
    department: str = None,
    current_user: User = Depends(require_authority),
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


@router.get("/complaints/mine")
def get_my_complaints(current_user: User = Depends(require_citizen)):
    db = SessionLocal()

    try:
        reported_ids = db.query(
            ComplaintReporter.complaint_id
        ).filter(
            ComplaintReporter.user_id == current_user.id
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
def get_complaint(
    complaint_id: int,
    current_user: User = Depends(require_authority),
):
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


@router.get("/complaint/{complaint_id}/image")
def get_complaint_image(
    complaint_id: int,
    current_user: User = Depends(require_authority),
):
    db = SessionLocal()
    try:
        complaint = db.query(Complaint).filter(
            Complaint.id == complaint_id
        ).first()

        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found")
        if not complaint.image_url:
            raise HTTPException(status_code=404, detail="No evidence image attached")

        filename = os.path.basename(complaint.image_url)
        image_path = os.path.abspath(os.path.join(UPLOAD_DIR, filename))
        if os.path.commonpath([UPLOAD_DIR, image_path]) != UPLOAD_DIR:
            raise HTTPException(status_code=404, detail="Evidence image not found")
        if not os.path.isfile(image_path):
            raise HTTPException(status_code=404, detail="Evidence image not found")

        media_type = mimetypes.guess_type(image_path)[0] or "application/octet-stream"
        return FileResponse(image_path, media_type=media_type)
    finally:
        db.close()


@router.put("/complaint/{complaint_id}/status")
def update_status(
    complaint_id: int,
    body: StatusUpdate,
    current_user: User = Depends(require_authority),
):
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

        valid_statuses = ["Pending", "In Progress", "Resolved"]

        if body.status not in valid_statuses:
            raise HTTPException(
                status_code=400,
                detail="Invalid status"
            )

        old_status = complaint.status
        complaint.status = body.status

        db.commit()
        db.refresh(complaint)

        return {
            "message": "Status updated successfully",
            "id": complaint.id,
            "complaint_id": complaint.id,
            "old_status": old_status,
            "new_status": complaint.status,
            "status": complaint.status
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        db.close()


@router.get("/analytics")
def get_analytics(current_user: User = Depends(require_authority)):
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