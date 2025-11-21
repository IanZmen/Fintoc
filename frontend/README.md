# Pepestore (React + Vite + Fintoc)

Mini tienda de snacks que consume el backend en `http://localhost:3000` para crear sesiones de pago y abrir el widget de Fintoc.

## Requisitos
- Node.js 18+.
- Backend con endpoint `POST /api/payment_intents` disponible.

## Instalación
```bash
cd frontend
npm install
```

## Variables de entorno
- Desarrollo: copia `.env.local.example` a `.env.local` y ajusta.
- Producción: usa `.env.production` (ejemplo incluido) con tu URL y public key live.
```
# Ejemplo local
VITE_API_URL=http://localhost:3000
VITE_FINTOC_PUBLIC_KEY=pk_test_xxx

# Ejemplo prod (fintoc-qufl.onrender.com)
# VITE_API_URL=https://fintoc-qufl.onrender.com
# VITE_FINTOC_PUBLIC_KEY=pk_live_xxx
```

## Ejecutar en desarrollo
```bash
npm run dev
# Vite en http://localhost:5173
```

## Flujo para probar
1. Agrega productos al carrito desde el catálogo (3 columnas, imágenes con fallback).
2. Abre el carrito con el botón superior “Carrito”.
3. Pulsa “Pagar con Fintoc”: crea la sesión y abre el widget; no se muestra el token en UI.
4. Completa el flujo sandbox en el widget.

## Producción / deploy
- API backend de ejemplo (producción): `https://fintoc-qufl.onrender.com`.
- Frontend desplegado (ejemplo): `http://fintoc-test-ian.s3-website-us-east-1.amazonaws.com/`.
- Usa `.env.production` para construir:
  ```bash
  npm run build
  ```
  Los estáticos quedan en `dist/`.

## Estructura
- Datos: `src/data/products.json` catálogo hardcodeado.
- API: `src/api/client.js` (`createCheckoutSession` con `VITE_API_URL`).
- Hooks: `src/hooks/useCart.js` (carrito/total) y `src/hooks/useCheckout.js` (checkout + session token).
- Componentes: `Cart.jsx`, `ProductList.jsx`, `FintocWidgetLauncher.jsx`.
- Páginas: `src/pages/LandingPage.jsx` y `src/pages/ProductsPage.jsx`.
- Routing: `src/App.jsx` (usa React Router para navegar entre Landing y Productos; el carrito solo se muestra en Productos).
- Estilos: globales en `src/index.css`, layout/páginas en `src/App.css`, navegación en `src/styles/nav.css`.
