import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


DATASET_PATH = "ml/data/complaints_dataset.csv"
MODEL_PATH = "ml/models/complaint_classifier.pkl"


df = pd.read_csv(DATASET_PATH)

df = df.dropna(subset=["complaint_text", "category"])
df["complaint_text"] = df["complaint_text"].astype(str).str.lower().str.strip()
df["category"] = df["category"].astype(str).str.strip()

print("Dataset Loaded Successfully")
print(df.head())


X = df["complaint_text"]
y = df["category"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.35,
    random_state=42,
    stratify=y
)


model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            min_df=3,
            max_df=0.80
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000,
            C=0.3
        )
    )
])


model.fit(X_train, y_train)

print("Model Training Complete")


predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.2f}")


os.makedirs("ml/models", exist_ok=True)

joblib.dump(
    model,
    MODEL_PATH
)

print("Model Saved Successfully")