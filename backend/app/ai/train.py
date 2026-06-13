import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


# Load Dataset
df = pd.read_csv("ml/data/complaints_dataset.csv")

print("Dataset Loaded Successfully")
print(df.head())


# Features and Labels
X = df["complaint_text"]
y = df["category"]


# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Create Pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("classifier", LogisticRegression(max_iter=1000))
])


# Train Model
model.fit(X_train, y_train)

print("Model Training Complete")


# Test Accuracy
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.2f}")


# Save Model
joblib.dump(
    model,
    "ml/models/complaint_classifier.pkl"
)

print("Model Saved Successfully")