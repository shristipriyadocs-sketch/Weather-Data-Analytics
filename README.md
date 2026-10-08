# Weather Data Analytics Dashboard

A full-stack, locally-hosted weather analytics dashboard built with **Python + FastAPI** (backend) and **React + TypeScript** (frontend). Data is sourced from the free [Open-Meteo API](https://open-meteo.com/) and cached locally in SQLite.

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Python | 3.11+ |
| Node.js | 18+ |
| npm | 9+ |

---

## Setup & Running

### 1. Backend (FastAPI — port 8000)

```bash
cd weather-dashboard/backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

- API base: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### 2. Frontend (React + Vite — port 5173)

```bash
cd weather-dashboard/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

- App: `http://localhost:5173`

---

## Environment Variables (Backend)

Copy `backend/env.example` to `backend/.env` and adjust as needed:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Uvicorn port |
| `CACHE_TTL_SECONDS` | `3600` | How long to cache Open-Meteo responses |

---

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Main dashboard — current conditions + 7-day forecast |
| `/historical` | Historical date-range explorer |
| `/compare` | Multi-city comparison (up to 5 cities) |

---

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/cities/search?q={query}` | City autocomplete |
| GET | `/api/weather/current?city={city}` | Current conditions |
| GET | `/api/weather/forecast?city={city}` | 7-day forecast |
| GET | `/api/weather/hourly?city={city}` | 24-hour hourly data |
| GET | `/api/weather/historical?city={city}&start={date}&end={date}` | Historical records |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend framework | FastAPI |
| ASGI server | Uvicorn |
| HTTP client (backend) | httpx |
| Local cache | SQLite (built-in) |
| Frontend framework | React + TypeScript |
| Build tool | Vite |
| Charts | Recharts |
| HTTP client (frontend) | Axios |
| State management | Zustand |
| Routing | react-router-dom |
