# CivicPulse

**A clearer path from civic concern to community action.**

CivicPulse is an open-source citizen grievance platform for reporting and privately tracking local civic issues. It combines AI-assisted triage with authority workflows and analytics.

Built for **UNBOUND '26** · FOSS Club PU · MIT License

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
- **Private complaint access:** complaint lists and attached evidence are no longer publicly served. Citizens can see reports linked to their account; authorized authorities can review the full queue.

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
| Complaint privacy and role separation | 7/10 after the access-control change | The intended policy is private citizen tracking plus authority-only administration. Production deployment must run the updated backend and configure a strong `SECRET_KEY`. |
| Overall maturity | 5/10 | It demonstrates a working prototype, but still needs operational testing, formal security/privacy review, reliable notifications, and complete redress workflows. |

The citizen submission and personal-complaint pages are useful for a prototype; the authority dashboard and analytics provide the right basic workflow. Their presentation is less consistent than the refreshed landing page, and the product does not yet have a mature service history, appeals, feedback, or notification experience. Treat CivicPulse as a promising project demo rather than a production government service.

### Privacy model

- Complaint lists are not public. The backend derives the citizen identity from a signed bearer token instead of trusting a client-supplied user ID.
- A citizen can list reports linked to their own account. The complete complaint queue, individual authority detail, status changes, analytics, and evidence-image retrieval require an authority account.
- Uploaded evidence is no longer mounted as an unauthenticated static directory; the authority detail view fetches it through an authenticated API route.
- Set a unique, high-entropy `SECRET_KEY` in the backend environment and redeploy the API. Local development generates a process-only random key if this is unset; tokens will stop working after a restart and are not shared between workers.
- The privacy change takes effect only when the updated backend is deployed. It cannot revoke copies of complaint data or evidence that may have been accessed or cached before deployment.
- These controls protect the current application routes; they do not replace a formal privacy assessment, production hardening, or review of hosting/database access.

## Technology

| Area | Technology |
|---|---|
| Frontend | React 19, Vite 8, Material UI, React Router |
| Charts | Recharts |
| Backend | FastAPI, SQLAlchemy |
| Database | PostgreSQL |
| Authentication | JWT |
| Classification | Scikit-learn, TF-IDF |
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

Create a PostgreSQL database, then create `backend/.env` with its connection string:
Also set a unique, high-entropy `SECRET_KEY` there so JWT sessions remain valid across restarts and workers.

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/civicpulse
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
