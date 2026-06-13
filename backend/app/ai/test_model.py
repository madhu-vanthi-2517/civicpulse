from classifier import classify_complaint


samples = [
    "Garbage has not been collected for a week",
    "Road full of potholes near bus stand",
    "Water leakage near school",
    "Streetlight not working in my area",
    "Stray dogs creating nuisance"
]


for complaint in samples:
    category = classify_complaint(complaint)

    print(f"\nComplaint: {complaint}")
    print(f"Predicted Category: {category}")