import { useState } from 'react';
import { createCheckoutSession } from '../api/client';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const startCheckout = async (amount, description) => {
    setLoading(true);
    setError(null);
    setSessionData(null);
    try {
      const data = await createCheckoutSession(amount, description);
      setSessionData(data);
      return data;
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar el checkout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sessionData, startCheckout };
}
