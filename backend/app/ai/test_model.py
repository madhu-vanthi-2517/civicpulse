from classifier import classify_complaint


samples = [
    "Garbage has not been collected for a week",
    "Road full of potholes near bus stand",
    "Water leakage near school",
    "Streetlight not working in my area",
    "Stray dogs creating nuisance",
    "Transformer caught fire near hospital",
    "Overflowing drainage near Muthialpet",
    "Broken road near Villianur bus stand",
    "No water supply in Lawspet",
    "Streetlights not functioning near Beach Road"
]


for complaint in samples:

    result = classify_complaint(complaint)

    print("\n====================================")
    print("Complaint:")
    print(complaint)

    print("\nPrediction:")
    print("Category  :", result["category"])
    print("Urgency   :", result["urgency"])
    print("Department:", result["department"])