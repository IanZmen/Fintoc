const express = require('express');
const { createPaymentIntent } = require('../services/paymentIntentsService');

const router = express.Router();

router.post('/payment_intents', async (req, res) => {
  try {
    const { amount, currency = 'CLP', description } = req.body || {};

    if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    if (typeof currency !== 'string' || !currency.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Currency is required',
      });
    }

    const paymentIntent = await createPaymentIntent({
      amount,
      currency,
      description,
    });

    return res.status(201).json({
      success: true,
      message: 'Payment intent created',
      data: paymentIntent,
    });
  } catch (error) {
    console.error('Error creating payment intent', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create payment intent',
    });
  }
});

module.exports = router;
