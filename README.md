# Smart City Backend (Node.js + Express + MongoDB)

This backend is built to work with the provided frontend (`smartnancy.html` / `test nanay .rtf`). It provides:
- Authentication (signup / login) using JWT
- Simple REST endpoints for metrics, alerts and chart data
- MongoDB models for users, alerts and metrics
- CORS enabled so you can serve the frontend from the filesystem or another origin
- Docker + docker-compose for local run (includes MongoDB)


![Uploading Overview .svg…]()

## Quick start (local)

1. Copy `.env.example` to `.env` and edit values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB (see Docker instructions below) or provide a remote `MONGO_URI`.
4. Run the app:
   ```bash
   npm run dev   # requires nodemon (dev)
   npm start     # production
   ```
5. By default the API runs on `http://localhost:4000`.

## Endpoints (summary)

- `POST /api/auth/signup` — body: `{{ username, password, role }}`
- `POST /api/auth/login` — body: `{{ username, password }}` → returns `{{ token }}`
- `GET /api/metrics` — protected — returns current metrics (traffic, aqi, energy, waste)
- `GET /api/chart-data` — protected — returns series data usable by Chart.js
- `GET /api/alerts` — public — returns recent alerts
- `POST /api/alerts` — protected — create a new alert

## Docker (recommended for testing)
1. Build and start services:
   ```bash
   docker-compose up --build
   ```
2. The API will be available at `http://localhost:4000` and Mongo at the `mongo` service.

## Notes to integrate with your frontend
- The provided frontend currently performs client-side demo auth. Replace its login handler to call `/api/auth/login` and store the returned JWT (in `localStorage`), then include `Authorization: Bearer <token>` on protected requests to `/api/metrics` and `/api/chart-data`.
- Chart.js expects data arrays; `/api/chart-data` returns a JSON object `{ labels: [...], datasets: [...] }` ready to be passed into a Chart.js `new Chart()` call.

If you want, I can also patch the frontend to call these endpoints and store the token — say the word and I’ll update the HTML to wire it up.
