const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function createCheckoutSession(amount, description) {
  const response = await fetch(`${baseURL}/api/payment_intents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount,
      currency: 'CLP',
      description
    })
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok || !body?.success) {
    throw new Error(body?.error || body?.message || 'No se pudo crear la sesión');
  }

  return body.data;
}

export function getPublicKey() {
  const key = import.meta.env.VITE_FINTOC_PUBLIC_KEY;
  if (!key) {
    throw new Error('Falta VITE_FINTOC_PUBLIC_KEY');
  }
  return key;
}
