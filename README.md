# Fintoc Sandbox (Backend + Frontend)

Repositorio con un backend Express para crear Payment Intents (Checkout Sessions) y recibir webhooks, y un frontend React/Vite para lanzar el widget de Fintoc.

## Estructura
- `backend/` → API Express (`/api/payment_intents`, `/webhook/fintoc`).
- `frontend/` → UI React + Vite que consume el backend y abre el FintocWidget.

## Rutas rápidas
- Backend: ver `backend/README.md`.
- Frontend: ver `frontend/README.md`.

## Pasos básicos
1. Backend:
   ```bash
   cd backend
   cp .env.example .env  # ajusta tus llaves
   npm install
   npm start
   ```
   Corre en `http://localhost:3000`.

2. Frontend:
   ```bash
   cd frontend
   cp .env.local.example .env.local  # agrega VITE_API_URL y VITE_FINTOC_PUBLIC_KEY
   # Opcional prod: .env.production con VITE_API_URL=https://fintoc-qufl.onrender.com
   npm install
   npm run dev
   ```
   Corre en `http://localhost:5173`.

Producción (ejemplo):
- Backend: `https://fintoc-qufl.onrender.com`
- Frontend: `http://fintoc-test-ian.s3-website-us-east-1.amazonaws.com/`

Sigue cada README para más detalles de endpoints y flujo del widget.
