# CivicPulse

**A full-stack learning prototype for local civic issue reporting.**

CivicPulse is an open-source prototype for reporting and privately tracking local civic issues. We built it to learn and demonstrate how a machine-learning component, a citizen- and authority-facing frontend, and a REST API/backend can work together as one civic-tech application. Its Puducherry-focused workflow is a project exploration, not an official government service or a replacement for CPGRAMS.

Built for **UNBOUND '26** · FOSS Club PU · MIT License

## Why we built CivicPulse

CPGRAMS already provides an established, government-wide grievance service. Our goal was not to recreate that service or claim that CivicPulse has features the government platform lacks. We wanted a practical project through which we could:

- Train and integrate a text-classification model that suggests a complaint category.
- Connect ML predictions and rule-based urgency/department routing to a usable reporting workflow.
- Build a React frontend for citizens and authorities and a FastAPI backend for authentication, complaint handling, and analytics.
- Explore how duplicate detection and role-based workflows might help organize local municipal reports.
- Learn how separate ML, frontend, and backend components are integrated, tested, and documented in a full-stack application.

The current implementation is a demonstration of these ideas. Its classification and routing suggestions need real-world evaluation, and the application is not yet ready to handle sensitive public submissions as a production service.

## What you can do

### For residents
- Submit civic complaints with a title, description, district, area, and optional photo evidence.
- Use **voice-to-text dictation** to fill in a complaint description where the browser supports speech recognition.
- Get AI-assisted category, urgency, and department suggestions when a complaint is submitted.
- See a warning when the report resembles an existing complaint.
- Follow the status of reports you filed after signing in to your account.
- Ask the built-in CivicPulse help assistant for guidance on reporting, tracking, and voice input.

### For authorities
- Review and update complaint statuses from the authority dashboard.
- View complaint analytics to understand reported issues and their distribution.

## What is new

- **Voice-to-text complaint input:** optional speech recognition in the complaint description field. Availability depends on browser support, permissions, and connection. Speech recognition is provided by the browser; consult its privacy settings for details.
- **CivicPulse Help:** a local, FAQ-guided chatbot for common reporting and tracking questions. It does not call an external AI service or require an AI API key.
- **Refreshed landing page:** responsive, accessible entry points for reporting, tracking, and getting help.
- **Configurable API URL:** set `VITE_API_BASE_URL` in the frontend to use a local or alternate backend.
- **Private-access controls in the repository:** complaint-list, authority, analytics, and evidence API routes require role-appropriate authentication. These controls must be deployed and verified on the backend before they protect the hosted service.

## How complaints flow

1. A resident signs in and submits a complaint, optionally including photo evidence.
2. FastAPI receives the form and the classifier suggests a category, urgency, and department.
3. The system checks for similar reports and can flag a possible duplicate.
4. The complaint is stored in the configured database.
5. Authorities review the complaint and update its status.
6. Residents sign in to follow reports linked to their account. Complaint details and evidence are not published as a public feed.

## CivicPulse and CPGRAMS

[CPGRAMS](https://pgportal.gov.in/) is the Government of India's Centralised Public Grievance Redress and Monitoring System. Its official overview describes a 24/7 portal connected to Ministries, Departments, and States, with role-based access for government offices. Citizens can track a grievance using its registration ID; CPGRAMS also documents appeal and feedback options.

CivicPulse is a much smaller, early-stage project focused on local municipal issues in Puducherry. It is not a replacement for CPGRAMS and does not yet offer its national department coverage, official grievance-redress workflows, appeals, feedback, or government integrations.

| Area | CivicPulse | CPGRAMS |
|---|---|---|
| Scope | Local civic concerns such as roads, sanitation, water, and electricity | Grievances across participating Government of India Ministries/Departments and States |
| Triage | Prototype AI-assisted category, urgency, department suggestions, and duplicate flagging | Government grievance routing and monitoring across participating authorities |
| Tracking | Private account view for the citizen who filed or joined the report; authority access for administration | Citizens track their grievance with its registration ID |
| Additional workflow | Citizen submission, status updates, authority dashboard, and analytics | Official grievance redress, appeal, and feedback options |
| Citizen assistance | Browser voice dictation and a local FAQ-guided help chatbot | CPGRAMS website describes a voice-based utility and chatbot assistance |

### Self-assessment

These are subjective assessments of this prototype, not an independent audit or a claim that CivicPulse is better than a government service.

| Dimension | Rating | Reason |
|---|---:|---|
| Local civic focus and ease of reporting | 7/10 | A focused complaint flow, optional photo, browser dictation, and AI-assisted triage make a useful demo; usability still needs testing with residents. |
| Complaint privacy and role separation | 4/10 until verified | Role-based API controls exist in the repository, but deployment is controlled separately and duplicate-linked reports can currently expose another report's details to linked reporters. |
| Overall maturity | 5/10 | It demonstrates a working prototype, but still needs operational testing, formal security/privacy review, reliable notifications, and complete redress workflows. |

The citizen submission and personal-complaint pages are useful for a prototype; the authority dashboard and analytics provide the right basic workflow. Their presentation is less consistent than the refreshed landing page, and the product does not yet have a mature service history, appeals, feedback, or notification experience. Treat CivicPulse as a promising project demo rather than a production government service.

### Privacy model

- The latest backend code removes the public complaint-list and static-upload routes. It derives the citizen identity from a signed bearer token instead of trusting a client-supplied user ID.
- The intended policy is that citizens can follow only reports associated with their account, while the full queue, authority details, status changes, analytics, and evidence retrieval require an authority account.
- **Known duplicate-report limitation:** similar submissions can currently be linked to an existing complaint record. Since a citizen's personal list returns linked complaint records, this design can expose details from the original report to another linked reporter. The data model should be changed to keep each citizen's submission private and store shared duplicate/issue grouping separately before claiming strict per-reporter confidentiality.
- Uploaded evidence should be served only by the authenticated authority API, not as a public static file.
- **Deployment and ownership:** the hosted backend is operated by a separate project developer, not by the frontend/ML contributor. The backend operator controls or can access the service and its configured database, subject to that hosting setup. This repository alone cannot verify who has production credentials, how backups are handled, or whether the latest privacy changes have been deployed.
- Set a unique, high-entropy `SECRET_KEY` in the backend environment and redeploy the API. Local development generates a process-only random key if this is unset; tokens will stop working after a restart and are not shared between workers.
- Backend access controls take effect online only after the operator deploys and verifies the updated backend. They cannot revoke copies of complaint data or evidence that may have been accessed or cached before deployment.
- Do not use real personal, sensitive, or identifying information in the hosted demo until backend ownership, access, retention, deletion, and deployment of the privacy changes have been confirmed with the operator.
- These application controls do not replace a formal privacy assessment, production hardening, or review of hosting and database access.

## Technology

| Area | Technology |
|---|---|
| Frontend | React 19, Vite 8, Material UI, React Router |
| Charts | Recharts |
| Backend/API | FastAPI, SQLAlchemy |
| Database | PostgreSQL |
| Authentication | JWT |
| ML/NLP | Scikit-learn text classifier, TF-IDF; rule-based urgency and department routing |
| Maps and geocoding | OpenStreetMap / Nominatim |
| Voice input | Browser Speech Recognition API (optional) |

## Project structure

```text
backend/
  app/
    ai/                 Complaint classifier
    routers/            Authentication, complaints, classification
    main.py             FastAPI application
frontend/
  src/
    components/         Shared UI, including CivicPulse Help
    pages/citizen/      Sign in, registration, submission, tracking
    pages/authority/    Dashboard, analytics, complaint details
ml/
  data/                 Classifier training dataset
  models/               Model artifacts
docs/                   Architecture and project documentation
```

## Run locally

### Prerequisites

- Python 3.10 or newer
- Node.js 20.19+ or 22.12+
- PostgreSQL

Clone the repository and open its project directory:

```powershell
git clone https://github.com/madhu-vanthi-2517/civicpulse.git
cd civicpulse
```

### 1. Configure the database

Create a PostgreSQL database, then create `backend/.env` with its connection string and a unique, high-entropy `SECRET_KEY`. The key must remain stable across restarts and workers so JWT sessions stay valid.

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/civicpulse
SECRET_KEY=replace-with-a-long-random-secret
```

Do not commit `.env` files or real credentials.

### 2. Start the backend

From the repository root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API documentation is available at `http://localhost:8000/docs`.

### 3. Start the frontend

In a separate terminal:

```powershell
cd frontend
npm ci
npm run dev
```

By default, the frontend uses the hosted CivicPulse API. To use the local backend, create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Restart the Vite development server after changing environment variables.

### 4. Validate the frontend

```powershell
cd frontend
npm run lint
npm run build
```

## Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing page and CivicPulse Help | Public |
| `/login` | Sign in | Public |
| `/register` | Create an account | Public |
| `/track` | Shortcut to personal complaint tracking | Signed-in citizen |
| `/submit` | Submit a complaint | Citizen |
| `/my-complaints` | Personal complaint tracker | Citizen |
| `/admin` | Authority dashboard | Authority |
| `/analytics` | Complaint analytics | Authority |
| `/complaint/:id` | Complaint details | Authority |

## Documentation

- [Architecture](./docs/architecture.png)
- [API reference](./docs/api_reference.md)
- [Model performance](./docs/model_performance.md)
- [AI attributions](./docs/ai_attributions.md)

## Deployment

- Frontend: https://civicpulse-wheat.vercel.app
- Backend API: https://civicpulse-backend-dlyv.onrender.com

## Contributing

Contributions are welcome. Please open an issue to discuss substantial changes and run the frontend lint and production build before submitting a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
