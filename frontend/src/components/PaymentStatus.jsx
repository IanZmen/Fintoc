export function PaymentStatus({ status, sessionData, error, widgetResult }) {
  const renderContent = () => {
    if (status === 'idle') {
      return 'Completa el formulario para crear una sesión.';
    }

    if (status === 'creating') {
      return 'Creando sesión de pago...';
    }

    if (error) {
      return `Error: ${error}`;
    }

    if (status === 'ready' && sessionData) {
      return `Sesión creada. Listo para abrir el widget (token: ${sessionData.session_token})`;
    }

    if (status === 'payment_success' && widgetResult) {
      return `Pago exitoso. Evento: ${widgetResult.eventType || 'success'}`;
    }

    if (status === 'payment_exit') {
      return 'El usuario cerró el widget sin finalizar el pago.';
    }

    return 'Estado desconocido.';
  };

  return (
    <div className="card status-card">
      <h2>Estado</h2>
      <p>{renderContent()}</p>

      {sessionData && (
        <div className="status-details">
          <strong>Session ID:</strong> {sessionData.id}
          <br />
          <strong>Monto:</strong> {sessionData.amount} {sessionData.currency}
        </div>
      )}

      {widgetResult?.payload && (
        <div className="status-details">
          <strong>Payload:</strong>
          <pre>{JSON.stringify(widgetResult.payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
