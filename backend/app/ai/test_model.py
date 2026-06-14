from classifier import (
    predict_category,
    predict_urgency
)

samples = [
    "Garbage has not been collected for a week",
    "Road full of potholes near bus stand",
    "Water leakage near school",
    "Streetlight not working in my area",
    "Stray dogs creating nuisance",
    "Transformer caught fire near hospital"
]

for complaint in samples:

    category = predict_category(complaint)

    urgency = predict_urgency(complaint)

    print("\n--------------------------------")
    print("Complaint:", complaint)
    print("Category :", category)
    print("Urgency  :", urgency)