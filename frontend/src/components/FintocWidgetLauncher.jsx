import { useEffect, useRef, useState } from 'react';

const WIDGET_SOURCES = [
  'https://js.fintoc.com/v1/',
  'https://js.fintoc.com/v1.0.0/widget.js',
];

export function FintocWidgetLauncher({
  sessionToken,
  publicKey,
  onSuccess,
  onExit,
  autoOpen = false,
  onAutoOpenHandled,
  hideButton = false,
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Fallo cargando ${src}`));
        document.body.appendChild(script);
      });

    const loadSources = async () => {
      for (const src of WIDGET_SOURCES) {
        try {
          await loadScript(src);
          setScriptReady(true);
          return;
        } catch (err) {
          setScriptError(err.message);
        }
      }
    };

    loadSources();
  }, []);

  const createWidget = () => {
    if (window.Fintoc?.create) {
      return window.Fintoc.create({
        publicKey,
        sessionToken,
        product: 'payments',
        onSuccess,
        onExit,
      });
    }
    if (window.FintocWidget) {
      return new window.FintocWidget({
        publicKey,
        sessionToken,
        onSuccess,
        onExit,
      });
    }
    throw new Error('Widget no disponible en la ventana');
  };

  const handleOpen = () => {
    if (!scriptReady || scriptError) return;
    try {
      widgetRef.current = createWidget();
      widgetRef.current.open();
    } catch (err) {
      setScriptError(err?.message || 'Error al abrir el widget');
      onAutoOpenHandled?.();
    }
  };

  useEffect(() => {
    if (autoOpen && scriptReady && sessionToken && !scriptError) {
      handleOpen();
      onAutoOpenHandled?.();
    }
  }, [autoOpen, scriptReady, sessionToken, scriptError]);

  return (
    <div className="widget-box">
      {!hideButton && (
        <button onClick={handleOpen} disabled={!scriptReady || !!scriptError}>
          Abrir widget de pago
        </button>
      )}
      {scriptError && <p className="error">{scriptError}</p>}
    </div>
  );
}
