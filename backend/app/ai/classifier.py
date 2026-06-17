def predict_category(text: str):
    return "Road"

import joblib
from pathlib import Path


MODEL_PATH = Path(__file__).resolve().parents[3] / "ml" / "models" / "complaint_classifier.pkl"

model = joblib.load(MODEL_PATH)


def predict_category(text):
    return model.predict([text])[0]


def predict_urgency(text):

    text = text.lower()

    high_keywords = [
        "hospital",
        "school",
        "fire",
        "overflow",
        "accident",
        "danger",
        "electrical",
        "transformer",
        "leakage"
    ]

    medium_keywords = [
        "road",
        "garbage",
        "streetlight",
        "water"
    ]

    if any(word in text for word in high_keywords):
        return "High"

    if any(word in text for word in medium_keywords):
        return "Medium"

    return "Low"


def predict_department(category):

    mapping = {
        "Water": "Public Works Department",
        "Roads": "Public Works Department",
        "Sanitation": "Municipality Sanitation Department",
        "Electrical": "Electricity Department",
        "Other": "Municipal Administration"
    }

    return mapping.get(
        category,
        "Municipal Administration"
    )

def predict_urgency(text: str):
    return "Medium"


def predict_department(category: str):
    return "Public Works Department"
def classify_complaint(text):

    category = predict_category(text)

    urgency = predict_urgency(text)

    department = predict_department(category)

    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }
