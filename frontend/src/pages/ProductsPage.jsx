import { ProductList } from '../components/ProductList';
import { FintocWidgetLauncher } from '../components/FintocWidgetLauncher';

export function ProductsPage({
  onAdd,
  onRemove,
  cartQuantities,
  sessionData,
  publicKey,
  autoOpenWidget,
  onAutoOpenHandled,
  onSuccess,
  onExit,
}) {
  return (
    <div className="content">
      <div className="section section-head">
        <div>
          <p className="eyebrow muted">Catálogo</p>
          <h2>Snacks listos para pagar</h2>
          <p className="muted">
            Ajusta cantidades con + / - y paga desde el carrito con Fintoc.
          </p>
        </div>
      </div>

      <ProductList
        onAdd={onAdd}
        onRemove={onRemove}
        cartQuantities={cartQuantities}
      />

      {sessionData && publicKey && (
        <FintocWidgetLauncher
          sessionToken={sessionData.session_token}
          publicKey={publicKey}
          onSuccess={onSuccess}
          onExit={onExit}
          autoOpen={autoOpenWidget}
          onAutoOpenHandled={onAutoOpenHandled}
          hideButton
        />
      )}
    </div>
  );
}
