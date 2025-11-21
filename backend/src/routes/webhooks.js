const express = require('express');

const router = express.Router();

router.post(
  '/fintoc',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const signature =
      req.header('Fintoc-Signature') || req.header('fintoc-signature');

    let payload = {};

    try {
      payload = req.body ? JSON.parse(req.body.toString('utf8')) : {};
    } catch (error) {
      console.error('Could not parse webhook payload as JSON', error);
    }

    const eventType = payload?.type || 'unknown';

    // TODO: validar la firma del webhook usando el secret de Fintoc cuando esté disponible.
    console.log('[Fintoc webhook] Event:', eventType, {
      signature,
      payload,
    });

    return res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  }
);

module.exports = router;
