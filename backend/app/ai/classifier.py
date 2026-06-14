import os
import joblib

# Locate model file

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "models",
    "complaint_classifier.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_category(text):
    return model.predict([text])[0]


def predict_urgency(text):

    text = text.lower()

    high_keywords = [
        "school",
        "hospital",
        "overflow",
        "accident",
        "danger",
        "fire",
        "emergency",
        "sewage",
        "leakage"
    ]

    medium_keywords = [
        "pothole",
        "streetlight",
        "garbage",
        "water supply",
        "drainage"
    ]

    for keyword in high_keywords:
        if keyword in text:
            return "High"

    for keyword in medium_keywords:
        if keyword in text:
            return "Medium"

    return "Low"


def predict_department(category):

    mapping = {
        "Sanitation": "Municipality Department",
        "Roads": "Public Works Department",
        "Water": "Public Works Department",
        "Electrical": "Electricity Department",
        "Other": "General Administration"
    }

    return mapping.get(
        category,
        "General Administration"
    )


def classify_complaint(text):

    category = predict_category(text)
    urgency = predict_urgency(text)
    department = predict_department(category)

    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }


if __name__ == "__main__":

    sample = "Water leakage near school"

    print(
        classify_complaint(sample)
    )