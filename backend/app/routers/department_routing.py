def get_department(category):

    departments = {
        "Water": "Public Works Department",
        "Roads": "Public Works Department",
        "Sanitation": "Municipality Sanitation Department",
        "Electrical": "Electricity Department",
        "Other": "Municipal Administration"
    }

    return departments.get(
        category,
        "Municipal Administration"
    )