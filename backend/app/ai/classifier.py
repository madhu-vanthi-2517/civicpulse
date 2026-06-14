import joblib

model = joblib.load(
    "ml/models/complaint_classifier.pkl"
)


def classify_complaint(text):
    prediction = model.predict([text])[0]
    return prediction