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
- Routes complaints to the proper municipal department
- Detects and merges duplicate reports of the same issue, tracking how many citizens reported it
- Offers real-time public status visibility
- Provides authorities with an analytics dashboard to identify problem areas
- Works on both desktop and mobile browsers

## Architecture

![CivicPulse system architecture](./docs/architecture.png)

### How a complaint flows through the system

1. Citizen logs in and submits a complaint via the React form, optionally attaching a photo
2. FastAPI receives it, stores the photo if attached, and calls the AI pipeline
3. Scikit-Learn classifies the text → returns Category, Urgency, Department
4. The system checks for similar existing complaints in the same district
   - If none found, a new complaint is created
   - If a match is found, the report is linked to the original and its report count increases
5. All fields saved to PostgreSQL database
6. Authority sees the complaint on the dashboard, including the photo and report count
7. Authority updates status → Pending to Resolved
8. Citizen tracks status on Public Tracker
9. Analytics page reflects the updated data

### How duplicate complaints are merged

![Duplicate complaint merge flow](./docs/duplicate_merge_flow.png)

## Citizen and authority journey

![Citizen and Authority User Flow](./docs/user_flow.png)

## Tech Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| Frontend framework | React 18 + Vite | Citizen and authority UI |
| Styling | Tailwind CSS | Responsive design |
| Routing | React Router v6 | Page navigation |
| Charts | Recharts | Analytics dashboard |
| Backend | FastAPI (Python) | REST API layer |
| Database | PostgreSQL 15 | Data storage |
| ORM | SQLAlchemy | DB models and queries |
| Auth | JWT (python-jose) | Citizen and authority login |
| AI / ML | Scikit-Learn | Complaint classification |
| Vectorizer | TF-IDF | Text feature extraction and duplicate detection |
| File storage | FastAPI static files | Photo evidence uploads |
| Maps | OpenStreetMap + Leaflet.js | Location picker and heatmap |
| Version control | GitHub | Collaboration |
| License | MIT | FOSS compliance |

## Project Structure

| Folder | Purpose |
|--------|---------|
| `backend/app/ai/` | Classifier, urgency scoring, department routing, duplicate detection |
| `backend/app/routers/` | API endpoints — auth, complaints, analytics, photo upload |
| `backend/uploads/` | Stored photo evidence from complaints |
| `backend/tests/` | Unit tests |
| `frontend/src/components/` | Shared UI components |
| `frontend/src/pages/Landing.jsx` | Public landing page |
| `frontend/src/pages/citizen/` | Login, Register, Submit, Tracker, Public Tracker |
| `frontend/src/pages/authority/` | Admin Dashboard, Analytics, Complaint Detail |
| `ml/data/` | Training dataset (CSV) |
| `ml/models/` | Saved trained model (.pkl) |
| `ml/notebooks/` | Model development notebook |
| `docs/` | Architecture, API reference, AI attributions |

## Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/track` | Public Complaint Tracker | Public |
| `/submit` | Submit Complaint (with optional photo) | Citizen |
| `/my-complaints` | My Complaints | Citizen |
| `/admin` | Authority Dashboard | Authority |
| `/analytics` | Analytics | Authority |
| `/complaint/:id` | Complaint Detail (includes photo if attached) | Authority |

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+

### Clone the repo
```bash
git clone https://github.com/madhu-vanthi-2517/civicpulse.git
cd civicpulse
```

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your PostgreSQL credentials
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Test accounts
|Role|E-mail|Password|
|----|------|--------|
|Admin|admin@test.com|Admin@12345|
|Citizen|citizen1@test.com|citizen@12345|

## Demo Video
_Will be added before final submission._

## Team

| Name | Role | GitHub |
|------|------|--------|
| Susmittha | AI / ML | @susmittha21 |
| Jeevadharshini | Backend | @jeevadharshini25 |
| Mathivathana | Frontend — Citizen UI | @mathi-vathana-06 |
| Madhuvanthi | Frontend — Authority UI + DevOps | @madhu-vanthi-2517 |

## License

This project is licensed under the MIT License.
See [LICENSE](./LICENSE) for details.

## AI Attributions

All AI tool usage is documented in [docs/ai_attributions.md](./docs/ai_attributions.md)
as required by UNBOUND '26 Article VI.
