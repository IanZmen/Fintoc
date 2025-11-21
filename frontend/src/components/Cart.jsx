export function Cart({ items, total, onRemove, onCheckout, open, onClose }) {
  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Carrito</h3>
          <button className="ghost" onClick={onClose}>
            Cerrar
          </button>
        </div>
        {items.length === 0 ? (
          <p className="muted">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <div className="muted">
                      ${item.price.toLocaleString('es-CL')} x {item.quantity}
                    </div>
                  </div>
                  <div className="cart-actions">
                    <span className="item-total">
                      ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </span>
                    <button className="ghost" onClick={() => onRemove(item.id)}>
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div>
                <div>Total</div>
                <div className="total">
                  ${total.toLocaleString('es-CL')} CLP
                </div>
              </div>
              <button onClick={onCheckout} disabled={total <= 0}>
                Pagar con Fintoc
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
