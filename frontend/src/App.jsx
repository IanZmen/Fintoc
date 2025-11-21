import { useMemo, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import './styles/nav.css';
import { Cart } from './components/Cart';
import { useCart } from './hooks/useCart';
import { useCheckout } from './hooks/useCheckout';
import { getPublicKey } from './api/client';
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';

const VIEWS = {
  landing: '/',
  products: '/productos',
};

function App() {
  const { items, total, addItem, removeItem, clearCart } = useCart();
  const { loading, sessionData, startCheckout } = useCheckout();
  const [envError, setEnvError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [autoOpenWidget, setAutoOpenWidget] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const publicKey = useMemo(() => {
    try {
      return getPublicKey();
    } catch (err) {
      setEnvError(err?.message || 'Public key no configurada');
      return null;
    }
  }, []);

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const cartQuantities = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      map[item.id] = item.quantity;
    });
    return map;
  }, [items]);

  const handleCheckout = async () => {
    if (total <= 0 || loading) return;
    try {
      await startCheckout(total, 'Compra en Pepestore');
      setCartOpen(false);
      setAutoOpenWidget(true);
    } catch (e) {
      // error seteado en hook
    }
  };

  const handleWidgetSuccess = () => {
    clearCart();
    setPaymentResult({
      status: 'success',
      title: 'Pago completado',
      message: 'Tu pago fue procesado con éxito.',
    });
  };

  const handleWidgetExit = () => {
    setPaymentResult({
      status: 'cancelled',
      title: 'Pago no completado',
      message: 'Cerraste el widget antes de finalizar el pago.',
    });
  };

  const isProducts = location.pathname === VIEWS.products;

  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">Pepestore</div>
        <div className="nav-actions">
          <Link
            className={location.pathname === VIEWS.landing ? 'nav-link active' : 'nav-link'}
            to={VIEWS.landing}
          >
            Inicio
          </Link>
          <Link
            className={location.pathname === VIEWS.products ? 'nav-link active' : 'nav-link'}
            to={VIEWS.products}
          >
            Productos
          </Link>
          {isProducts && (
            <button className="cart-button" onClick={() => setCartOpen(true)}>
              Ir al carrito ({cartCount})
            </button>
          )}
        </div>
      </nav>

      {envError && (
        <div className="section error-box">
          <p className="error">{envError}</p>
        </div>
      )}

      <Routes>
        <Route
          path={VIEWS.landing}
          element={
            <LandingPage
              onGoProducts={() => navigate(VIEWS.products)}
              onOpenCart={() => {
                navigate(VIEWS.products);
                setCartOpen(true);
              }}
              cartCount={cartCount}
              total={total}
            />
          }
        />
        <Route
          path={VIEWS.products}
          element={
            <ProductsPage
              onAdd={addItem}
              onRemove={removeItem}
              cartQuantities={cartQuantities}
              sessionData={sessionData}
              publicKey={publicKey}
              autoOpenWidget={autoOpenWidget}
              onAutoOpenHandled={() => setAutoOpenWidget(false)}
              onSuccess={handleWidgetSuccess}
              onExit={handleWidgetExit}
            />
          }
        />
        <Route path="*" element={<Navigate to={VIEWS.landing} replace />} />
      </Routes>

      {isProducts && (
        <Cart
          items={items}
          total={total}
          onRemove={removeItem}
          onCheckout={handleCheckout}
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        />
      )}

      {paymentResult && (
        <div className="modal-overlay" onClick={() => setPaymentResult(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className={paymentResult.status === 'success' ? 'success' : 'error'}>
              {paymentResult.title}
            </h3>
            <p>{paymentResult.message}</p>
            <button onClick={() => setPaymentResult(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
