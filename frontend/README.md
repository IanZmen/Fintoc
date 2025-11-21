# Frontend Fintoc Checkout (React + Vite)

Interfaz mínima para crear una sesión de pago contra el backend y abrir el widget de Fintoc con el `session_token`.

## Requisitos
- Backend corriendo en `http://localhost:3000` con el endpoint `POST /api/payment_intents`.
- Node.js 18+.

## Instalación
```bash
cd frontend
npm install
```

## Variables de entorno
Crea `.env.local` (puedes copiar `.env.local.example`) con tu public key y (opcional) base URL del backend:
```
VITE_FINTOC_PUBLIC_KEY=pk_test_xxx
VITE_API_BASE_URL=http://localhost:3000
```

## Ejecutar en desarrollo
```bash
npm run dev
# Vite en http://localhost:5173
```

## Flujo de uso
1. Llena el formulario con `amount` y `description`.
2. Al enviar, se llama al backend (`/api/payment_intents`) y se guarda `session_token`.
3. Aparece un botón para abrir el widget de Fintoc; se carga `https://js.fintoc.com/v1.0.0/widget.js`.
4. Al completar el pago se muestra el estado de éxito; si el usuario cierra el widget sin pagar, se muestra el estado de salida.

## Estructura
- `src/api/fintocClient.js`: consumo del backend (createPaymentIntent).
- `src/hooks/useCheckoutSession.js`: maneja loading/error/sessionData.
- `src/components/PaymentForm.jsx`: formulario de pago.
- `src/components/PaymentStatus.jsx`: estados y payloads.
- `src/components/FintocWidgetLauncher.jsx`: carga el script y abre el widget.
- `src/App.jsx`: orquesta el flujo con el public key (`import.meta.env.VITE_FINTOC_PUBLIC_KEY`).
