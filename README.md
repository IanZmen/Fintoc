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
   cp .env.local.example .env.local  # o crea y agrega VITE_FINTOC_PUBLIC_KEY
   npm install
   npm run dev
   ```
   Corre en `http://localhost:5173`.

Sigue cada README para más detalles de endpoints y flujo del widget.
