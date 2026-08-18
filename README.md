# Amith Vardhan Reddy Surasani — Professional Portfolio

A production-style personal portfolio built with **React + Vite** on the frontend and **FastAPI** on the backend.

## Design goals

- Premium dark visual system with glassmorphism, subtle gradients, motion and responsive layouts.
- Hiring-manager-first information architecture: value proposition → measurable impact → experience → projects → skills → education/certifications → contact.
- Data-driven React UI: profile content is served by the FastAPI API rather than hard-coded into page components.
- Accessible keyboard navigation, semantic sections, reduced-motion support, responsive mobile navigation and strong contrast.
- No fabricated employers, metrics, credentials, links or technologies.

## Source grounding

The portfolio content was derived from the uploaded profile PDF and resume. One source discrepancy was detected for DUTA:
- Profile PDF: July 2024 – Present
- Resume: March 2024 – March 2026

The initial implementation uses the **resume's March 2024 – March 2026 timeline**. Update `backend/app/data.py` if the PDF timeline should be used instead.

## Structure

```text
amith-professional-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── data.py
│   │   └── main.py
│   ├── static/
│   └── requirements.txt
└── README.md
```

## Run locally

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend API:
- `GET /api/health`
- `GET /api/profile`
- `POST /api/contact`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

For production:

```bash
npm run build
npm run preview
```

## Connecting frontend to backend

Vite proxies `/api` to `http://localhost:8000` during development. For a deployed setup, either:
1. serve both behind the same reverse proxy/domain, or
2. set `VITE_API_BASE_URL` to the deployed FastAPI origin.

Example:

```bash
VITE_API_BASE_URL=https://api.example.com npm run build
```

## Deployment architecture

A simple production arrangement is:

```text
Browser
   │
   ▼
React/Vite static build
   │
   ├── /assets/*
   │
   └── /api/* ─────► FastAPI
                         │
                         └── contact message persistence
```

The frontend does not require a database. The contact endpoint persists submissions to a JSON file for this starter implementation; replace it with PostgreSQL, MongoDB, an email service, or another production datastore before public deployment.

## Customization

The primary content source is:

`backend/app/data.py`

The visual system is primarily in:

`frontend/src/styles/global.css`

The main page composition is in:

`frontend/src/App.jsx`.

## Resume

The attached resume can be placed in `frontend/public/` and named:

`Amith_Vardhan_Reddy_Surasani_Resume.docx`

The UI automatically shows the Resume CTA; if the file is absent, the button is hidden by the frontend.


## Deploy as one application on Render

This project can be deployed as **one Render Web Service**. The Dockerfile builds the React/Vite frontend and then runs FastAPI as the single public server. FastAPI serves both the `/api/*` endpoints and the compiled React files.

### Render deployment

1. Push this repository to GitHub.
2. In Render, choose **New → Web Service** and connect the repository.
3. In the service settings choose **Docker** as the language/runtime.
4. Leave the Dockerfile path as `Dockerfile` if it is in the repository root.
5. Choose the **Free** instance if you want to start without paying.
6. Do not add a build command or start command; Render uses the Dockerfile.
7. Create the Web Service and wait for the Docker build/deploy to finish.
8. Open the generated `onrender.com` URL. The React portfolio and FastAPI API will now be served from the same URL.

The frontend uses relative `/api/...` URLs in production, so **do not set `VITE_API_BASE_URL` on Render**.

