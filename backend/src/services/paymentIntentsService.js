const { fintocClient } = require('../config/fintoc');

/**
 * Crea un checkout session (equivalente a un Payment Intent) en modo test.
 */
async function createPaymentIntent({ amount, currency, description }) {
  const payload = {
    amount,
    currency,
    description,
    mode: 'test',
  };

  const checkoutSession = await fintocClient.checkoutSessions.create(payload);

  return checkoutSession;
}

module.exports = { createPaymentIntent };
