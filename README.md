# CivicPulse
AI-powered citizen grievance intelligence system, automatically categorizes, prioritizes, and 
routes civic complaints to the correct municipal department
 
Built for **UNBOUND '26** · FOSS Club PU · MIT License 

## Problem 
Citizens in urban India lack a reliable and transparent way to report and track local civic issues.
Current municipal portals are fragmented and divided by department, and they provide no feedback after submission. 
  
Problems like potholes, broken streetlights, garbage buildup, water leaks, and sewage overflow 
remain unresolved. This isn't due to a lack of resources but happens because complaints are 
manually handled, often duplicated, and hard to prioritize on a large scale. 

## Solution
CivicPulse is an open-source, AI-powered grievance platform that: 
- Allows citizens to submit complaints with location and photo evidence
- Automatically categorizes complaint types using NLP
- Assigns urgency levels (Low, Medium, High)
- Routes complaints to the proper municipal  department
- Offers real-time public status visibility
- Provides authorities with an analytics dashboard to identify problem areas
    
## Tech Stack

| Component       | Tool                        |
|-----------------|-----------------------------|
| Frontend        | React + Tailwind CSS        |
| Backend         | FastAPI                     |
| Database        | PostgreSQL                  |
| AI / ML         | Scikit-Learn                |
| Maps            | OpenStreetMap (Leaflet.js)  |
| Version Control | GitHub                      |
| License         | MIT                         |

## Project Structure

| Folder | Purpose |
|--------|---------|
| `backend/app/ai/` | Classifier, duplicate detection, routing |
| `backend/app/routers/` | API endpoints |
| `backend/tests/` | Unit tests |
| `frontend/src/components/` | Shared components |
| `frontend/src/pages/citizen/` | Citizen-facing pages |
| `frontend/src/pages/authority/` | Admin dashboard |
| `ml/` | Training data, saved models, notebooks |
| `docs/` | Architecture, API reference, attributions |

## Team

| Name | Role | GitHub |
|------|------|--------|
| Susmittha | AI / ML | @susmittha21 |
| Jeevadharshini | Backend | @jeevadharshini25 |
| Mathivathana | Frontend — Citizen UI | @mathi-vathana-06 |
| Madhuvanthi | Frontend — Authority UI + DevOps | @madhu-vanthi-2517 |

 ## Demo Flow
 1. Citizen logs in and submits a complaint.
 2. AI quickly tags it with category, urgency, and department.
 3. Complaint shows up on the authority dashboard.
 4. Authority updates the status from pending to resolved.
 5. Analytics page shows live data updates.
   
## Setup
- Full setup instructions will be added as development progresses.

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+

### Clone the repo
```bash
git clone https://github.com/madhu-vanthi-2517/civicpulse.git
cd civicpulse
```

## License
This project is licensed under the MIT License.
See [LICENSE](./LICENSE) for details.

## AI Attributions
All AI tool usage is documented in [docs/ai_attributions.md](./docs/ai_attributions.md)
as required by UNBOUND '26 Article VI.
