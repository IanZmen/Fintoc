import { useMemo, useState } from 'react';
import products from '../data/products.json';

export function ProductList({ onAdd, onRemove, cartQuantities = {} }) {
  const [fallbacks, setFallbacks] = useState({});

  const items = useMemo(() => products, []);

  const handleImageError = (id) => {
    setFallbacks((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="section" id="catalog">
      <div className="section-head">
        <div>
          <p className="eyebrow muted">Catálogo</p>
          <h2>Snacks listos para que los pagues</h2>
        </div>
      </div>
      <div className="product-grid">
        {items.map((product) => {
          const showFallback = fallbacks[product.id];
          return (
            <div className="product-card" key={product.id}>
              {showFallback ? (
                <div className="image-fallback">Imagen no disponible</div>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={() => handleImageError(product.id)}
                />
              )}
              <div className="product-info">
                <div className="product-meta">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                </div>
                <p className="price">${product.price.toLocaleString('es-CL')}</p>
              </div>
              <div className="badge-row">
                {cartQuantities[product.id] ? (
                  <div className="badge">
                    En carrito: {cartQuantities[product.id]}
                  </div>
                ) : null}
                <div className="qty-actions">
                  <button className="ghost" onClick={() => onRemove(product.id)}>
                    -
                  </button>
                  <button onClick={() => onAdd(product)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
