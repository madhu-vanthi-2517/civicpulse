from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.classifier import (
    predict_category,
    predict_urgency,
    predict_department
)

router = APIRouter()

class ComplaintRequest(BaseModel):
    text: str

@router.post("/classify")
def classify(request: ComplaintRequest):
    category = predict_category(request.text)
    urgency = predict_urgency(request.text)
    department = predict_department(category)
    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }