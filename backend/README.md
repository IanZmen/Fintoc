# Backend Fintoc Sandbox (Express)

Servidor mínimo en Node.js/Express para crear Payment Intents (Checkout Sessions) y recibir webhooks de Fintoc en modo test.

## Requisitos
- Node.js 18+ recomendado.
- Claves de prueba de Fintoc: `FINTOC_SECRET_KEY`.

## Instalación
```bash
cd backend
npm install
```

## Variables de entorno
Crea un `.env` basado en `.env.example`:
```
FINTOC_SECRET_KEY=sk_test_xxx
PORT=3000
```

## Ejecutar
```bash
npm start
# Servidor en http://localhost:3000
```

## Endpoints
- `POST /api/payment_intents`
  - Body JSON:
    ```json
    {
      "amount": 1000,
      "currency": "CLP",
      "description": "Pedido #123"
    }
    ```
  - Respuesta: `{ success, data }` donde `data.session_token` y `data.id` permiten inicializar el widget de pago.

- `POST /webhook/fintoc`
  - Recibe webhooks de Fintoc.
  - Lee la cabecera `Fintoc-Signature`, registra evento y payload y responde `200 OK`.
  - Tiene un TODO para agregar validación real de firma.

## Probar con Postman
1. Enviar `POST http://localhost:3000/api/payment_intents` con el body anterior.
2. Debes recibir `201` y un JSON con `success: true` y `data` (Payment Intent/Checkout Session).
3. Configurar en el panel de Fintoc la URL pública de webhook apuntando a `http://localhost:3000/webhook/fintoc` (o usa un túnel tipo ngrok) para ver los logs en consola.
