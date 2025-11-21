export function LandingPage({ onGoProducts, onOpenCart, cartCount, total }) {
  const features = [
    {
      title: 'Pagos rápidos',
      desc: 'Fintoc integrado para cerrar tu compra en segundos.',
    },
    {
      title: 'Catálogo curado',
      desc: 'Snacks, bebidas y dulces listos para tu antojo.',
    },
    {
      title: 'Flujo simple',
      desc: 'Agrega, paga y listo. Sin pasos extra.',
    },
  ];

  const steps = [
    'Explora y ajusta cantidades con + / -',
    'Abre el carrito y confirma tu pedido',
    'Paga con Fintoc y listo',
  ];

  return (
    <>
      <header className="hero">
        <div className="hero-top">
          <div>
            <p className="eyebrow">Pepestore</p>
            <h1>Snacks listos, pagos inmediatos</h1>
            <p className="muted">
              Arma tu carrito en segundos y paga con Fintoc. Todo en un flujo
              moderno y seguro.
            </p>
            <div className="actions">
              <button onClick={onGoProducts}>Ver catálogo</button>
              <button className="ghost" onClick={onOpenCart}>
                Ir al carrito ({cartCount})
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="stat">
              <span className="pill">Checkout Fintoc</span>
              <h3>Pagos en 3 pasos</h3>
              <p className="muted">Selecciona, confirma, paga. Listo.</p>
              <button onClick={onOpenCart}>Abrir carrito</button>
            </div>
            <div className="stat dark">
              <h4>Total carrito</h4>
              <p className="total-hero">
                ${total.toLocaleString('es-CL')} CLP
              </p>
              <p className="muted">Productos: {cartCount}</p>
            </div>
          </div>
        </div>
        <div className="hero-panels">
          {features.map((f) => (
            <div key={f.title} className="panel">
              <h3>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="section steps">
        <h2>Cómo funciona</h2>
        <div className="step-grid">
          {steps.map((s, idx) => (
            <div key={s} className="step">
              <span className="pill">Paso {idx + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
