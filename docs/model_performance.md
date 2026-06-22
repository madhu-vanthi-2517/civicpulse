# AI Model Performance

## Dataset

- Total training rows: 560
- Categories:
  - Water
  - Roads
  - Sanitation
  - Electrical
  - Other

## Pipeline

TF-IDF Vectorizer → Logistic Regression

## Training Configuration

- Test Size: 35%
- Stratified Split: Yes
- Max Iterations: 1000
- C Value: 0.3
- N-Grams: (1,2)

## Accuracy

Accuracy: 98.32%

The high accuracy is attributed to the
textual distinction between complaint categories
and the effectiveness of TF-IDF features for
civic complaint classification.

## Urgency Detection

Rule-based keyword matching.

Levels:
- High
- Medium
- Low

Examples:

- Transformer sparking → High
- Water leakage near school → High
- Garbage accumulation → Medium

## Department Routing

Water → Public Works Department 

Roads → Public Works Department 

Sanitation → Municipality Sanitation Department 

Electrical → Electricity Department 

Other → Municipal Administration

## Duplicate Detection

TF-IDF + Cosine Similarity

Threshold: 0.75

Scope:
- Same district
- Non-resolved complaints

Duplicate complaints generate a warning
while still allowing complaint submission.

## Example Predictions

Input:
"Streetlight not working near bus stand"

Output:
Category: Electrical

Urgency: Medium

Department: Electricity Department

Input:
"Water leakage near school"

Output:
Category: Water

Urgency: High

Department: Public Works Department

