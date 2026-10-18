# CivicPulse

**A clearer path from civic concern to community action.**

CivicPulse is an open-source citizen grievance platform for reporting and tracking local civic issues. It combines AI-assisted triage with transparent complaint status, public tracking, and authority analytics.

Built for **UNBOUND '26** · FOSS Club PU · MIT License

## What you can do

### For residents
- Submit civic complaints with a title, description, district, area, and optional photo evidence.
- Use **voice-to-text dictation** to fill in a complaint description where the browser supports speech recognition.
- Get AI-assisted category, urgency, and department suggestions when a complaint is submitted.
- See a warning when the report resembles an existing complaint.
- Follow complaint status using the public tracker or your account.
- Ask the built-in CivicPulse help assistant for guidance on reporting, tracking, and voice input.

### For authorities
- Review and update complaint statuses from the authority dashboard.
- View complaint analytics to understand reported issues and their distribution.

## What is new

- **Voice-to-text complaint input:** optional speech recognition in the complaint description field. Availability depends on browser support, permissions, and connection. Speech recognition is provided by the browser; consult its privacy settings for details.
- **CivicPulse Help:** a local, FAQ-guided chatbot for common reporting and tracking questions. It does not call an external AI service or require an AI API key.
- **Refreshed landing page:** responsive, accessible entry points for reporting, tracking, and getting help.
- **Configurable API URL:** set `VITE_API_BASE_URL` in the frontend to use a local or alternate backend.

## How complaints flow

1. A resident signs in and submits a complaint, optionally including photo evidence.
2. FastAPI receives the form and the classifier suggests a category, urgency, and department.
3. The system checks for similar reports and can flag a possible duplicate.
4. The complaint is stored in the configured database.
5. Authorities review the complaint and update its status.
6. Residents follow progress through the public tracker or their account.

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
| `/track` | Public complaint tracker | Public |
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
