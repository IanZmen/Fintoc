const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function createPaymentIntent({ amount, currency, description }) {
  const response = await fetch(`${API_BASE_URL}/api/payment_intents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, currency, description }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok || !body?.success) {
    throw new Error(
      body?.error || body?.message || 'No se pudo crear la sesión de pago'
    );
  }

  return body.data;
}

export function getPublicKey() {
  const key = import.meta.env.VITE_FINTOC_PUBLIC_KEY;
  if (!key) {
    throw new Error('Falta VITE_FINTOC_PUBLIC_KEY en el entorno de Vite');
  }
  return key;
}
