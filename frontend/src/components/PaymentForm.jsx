import { useState } from 'react';

export function PaymentForm({ onSubmit, disabled }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    onSubmit({
      amount: parsedAmount,
      currency: 'CLP',
      description: description.trim() || 'Pago con Fintoc',
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Crear sesión de pago</h2>

      <label>
        Monto (CLP)
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10000"
          required
        />
      </label>

      <label>
        Descripción
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Pedido #123"
        />
      </label>

      <button type="submit" disabled={disabled}>
        {disabled ? 'Creando...' : 'Pagar'}
      </button>
    </form>
  );
}
