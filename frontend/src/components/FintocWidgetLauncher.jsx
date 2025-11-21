import { useEffect, useRef, useState } from 'react';

// Versión estable del widget (v1) que sí está disponible públicamente.
const WIDGET_SRC = 'https://js.fintoc.com/v1/';

export function FintocWidgetLauncher({
  sessionToken,
  publicKey,
  onSuccess,
  onExit,
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${WIDGET_SRC}"]`);
    if (existingScript) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setScriptError('No se pudo cargar el widget de Fintoc');
    document.body.appendChild(script);

    return () => {
      // No removemos el script para permitir reutilizarlo.
    };
  }, []);

  const handleOpen = () => {
    if (!scriptReady || scriptError) return;

    if (!window.Fintoc || !window.Fintoc.create) {
      setScriptError('Fintoc.create no está disponible aún.');
      return;
    }

    try {
      widgetRef.current = window.Fintoc.create({
        publicKey,
        sessionToken,
        product: 'payments',
        onSuccess: (payload) => {
          onSuccess?.(payload);
        },
        onExit: (payload) => {
          onExit?.(payload);
        },
      });

      widgetRef.current.open();
    } catch (error) {
      setScriptError(error?.message || 'Error al abrir el widget');
    }
  };

  return (
    <div className="card">
      <h2>Widget de pago</h2>
      <p>Sesion lista. Haz clic para abrir el widget de Fintoc.</p>
      <button onClick={handleOpen} disabled={!scriptReady || !!scriptError}>
        Abrir widget de pago
      </button>
      {scriptError && <p className="error">{scriptError}</p>}
    </div>
  );
}
