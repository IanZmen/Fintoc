import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { PaymentForm } from './components/PaymentForm';
import { PaymentStatus } from './components/PaymentStatus';
import { FintocWidgetLauncher } from './components/FintocWidgetLauncher';
import { useCheckoutSession } from './hooks/useCheckoutSession';
import { getPublicKey } from './api/fintocClient';

function App() {
  const { createSession, loading, error, sessionData } = useCheckoutSession();
  const [status, setStatus] = useState('idle');
  const [widgetResult, setWidgetResult] = useState(null);
  const [envError, setEnvError] = useState(null);

  const publicKey = useMemo(() => {
    try {
      return getPublicKey();
    } catch (err) {
      setEnvError(err?.message || 'Public key no configurada');
      return null;
    }
  }, []);

  useEffect(() => {
    if (envError) {
      setStatus('error');
      return;
    }

    if (loading) {
      setStatus('creating');
    } else if (!loading && sessionData && !error) {
      setStatus('ready');
    } else if (!loading && error) {
      setStatus('error');
    }
  }, [loading, sessionData, error, envError]);

  const handleCreateSession = async (payload) => {
    setWidgetResult(null);
    try {
      await createSession(payload);
    } catch (_) {
      // error ya manejado en el hook
    }
  };

  const handleWidgetSuccess = (payload) => {
    setWidgetResult({ status: 'success', payload, eventType: 'success' });
    setStatus('payment_success');
  };

  const handleWidgetExit = (payload) => {
    setWidgetResult({ status: 'exit', payload, eventType: 'exit' });
    setStatus('payment_exit');
  };

  return (
    <div className="app">
      <header>
        <h1>Fintoc Checkout (Sandbox)</h1>
        <p>
          Crea una sesión en el backend y abre el widget con tu
          <code> session_token</code>.
        </p>
      </header>

      <main className="layout">
        <PaymentForm onSubmit={handleCreateSession} disabled={loading} />

        <PaymentStatus
          status={status}
          sessionData={sessionData}
          error={error || envError}
          widgetResult={widgetResult}
        />

        {sessionData && publicKey && (
          <FintocWidgetLauncher
            sessionToken={sessionData.session_token}
            publicKey={publicKey}
            onSuccess={handleWidgetSuccess}
            onExit={handleWidgetExit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
