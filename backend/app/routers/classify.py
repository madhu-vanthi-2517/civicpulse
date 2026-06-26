from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.classifier import (
    is_valid_complaint_text,
    predict_category,
    predict_urgency,
    predict_department
)

router = APIRouter()

class ComplaintRequest(BaseModel):
    text: str

@router.post("/classify")
def classify(request: ComplaintRequest):
    if not is_valid_complaint_text(request.text):
        return {
            "category": "Invalid",
            "urgency": "Low",
            "department": "Municipal Administration",
            "message": "Invalid complaint. Please enter a clear and meaningful issue description."
        }

    category = predict_category(request.text)
    urgency = predict_urgency(request.text)
    department = predict_department(category, request.text)
    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }