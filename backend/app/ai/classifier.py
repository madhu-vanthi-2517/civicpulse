import joblib
import os

model_path = os.path.join(
    os.path.dirname(__file__),
    "../../../ml/models/complaint_classifier.pkl"
)
model = joblib.load(model_path)

DEPARTMENT_MAP = {
    "Sanitation": "Municipal Corporation",
    "Roads": "Road Department",
    "Water": "Water Board",
    "Electrical": "Electricity Board",
    "Other": "General Department"
}

HIGH_KEYWORDS = [
    "overflow", "flood", "school", "hospital",
    "fire", "collapse", "sewage", "accident"
]
MEDIUM_KEYWORDS = [
    "broken", "leaking", "damaged",
    "blocked", "not working"
]

def predict_category(text: str) -> str:
    return model.predict([text])[0]

def predict_urgency(text: str) -> str:
    text_lower = text.lower()
    if any(w in text_lower for w in HIGH_KEYWORDS):
        return "High"
    elif any(w in text_lower for w in MEDIUM_KEYWORDS):
        return "Medium"
    return "Low"

def predict_department(category: str) -> str:
    return DEPARTMENT_MAP.get(
        category, "General Department"
    )