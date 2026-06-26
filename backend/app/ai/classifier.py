import re
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


def is_valid_complaint_text(text):
    if not text or not str(text).strip():
        return False

    cleaned = re.sub(r"[^a-zA-Z0-9\s]", " ", str(text).lower()).strip()
    if not cleaned:
        return False

    if len(cleaned.split()) < 3:
        return False

    common_noise = [
        "asdf", "qwerty", "lorem", "ipsum", "test", "hello", "hi",
        "random", "spam", "asdfghjkl", "abc"
    ]
    if any(token in cleaned for token in common_noise):
        return False

    english_words = re.findall(r"[a-z]+", cleaned)
    if not english_words:
        return False

    return True


def predict_category(text):
    normalized = str(text or "").strip()
    lower_text = normalized.lower()

    if any(keyword in lower_text for keyword in ["road", "pothole", "street", "lane", "traffic", "drain", "drainage"]):
        return "Roads"

    if any(keyword in lower_text for keyword in ["water", "pipe", "leak", "drainage", "sewage", "overflow"]):
        return "Water"

    if any(keyword in lower_text for keyword in ["garbage", "trash", "waste", "sanitation", "dirty", "dump"]):
        return "Sanitation"

    if any(keyword in lower_text for keyword in ["electric", "power", "light", "streetlight", "transformer", "wire", "outage"]):
        return "Electrical"

    try:
        return model.predict([normalized])[0]
    except Exception:
        return "Other"


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


def predict_department(category, text=None):
    normalized_category = (category or "").strip()
    text_lower = (text or "").lower()

    if any(keyword in text_lower for keyword in ["road", "pothole", "street", "lane", "traffic", "drain", "drainage"]):
        return "Public Works Department"

    mapping = {
        "Water": "Public Works Department",
        "Roads": "Public Works Department",
        "Sanitation": "Municipality Sanitation Department",
        "Electrical": "Electricity Department",
        "Other": "Municipal Administration"
    }

    return mapping.get(normalized_category, "Municipal Administration")


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
    department = predict_department(category, text)

    return {
        "category": category,
        "urgency": urgency,
        "department": department
    }
