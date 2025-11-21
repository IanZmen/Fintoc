import { useState } from 'react';
import { createPaymentIntent } from '../api/fintocClient';

export function useCheckoutSession() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSession = async ({ amount, currency = 'CLP', description }) => {
    setLoading(true);
    setError(null);
    setSessionData(null);

    try {
      const data = await createPaymentIntent({ amount, currency, description });
      setSessionData(data);
      return data;
    } catch (err) {
      const message = err?.message || 'Error desconocido';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSession, loading, error, sessionData };
}
