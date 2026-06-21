import joblib
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


MODEL_PATH = (
    Path(__file__).resolve().parents[3]
    / "ml"
    / "models"
    / "complaint_classifier.pkl"
)

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
        "leakage",
        "emergency",
        "sewage"
    ]

    medium_keywords = [
        "road",
        "garbage",
        "streetlight",
        "water",
        "pothole",
        "drainage"
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

    return mapping.get(category, "Municipal Administration")


def check_duplicate(new_text, existing_complaints, threshold=0.75):
    if not existing_complaints:
        return None

    texts = [
        f"{complaint.title} {complaint.description}"
        for complaint in existing_complaints
    ]

    texts.append(new_text)

    vectorizer = TfidfVectorizer(
        lowercase=True,
        ngram_range=(1, 2)
    )

    vectors = vectorizer.fit_transform(texts)

    similarities = cosine_similarity(
        vectors[-1],
        vectors[:-1]
    )[0]

    max_score = similarities.max()

    if max_score >= threshold:
        best_match_index = similarities.argmax()
        return existing_complaints[best_match_index]

    return None


def classify_complaint(text):
    category = predict_category(text)
    urgency = predict_urgency(text)
    department = predict_department(category)

    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }
