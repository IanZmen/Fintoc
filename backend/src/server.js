require('dotenv').config();

const express = require('express');
const cors = require('cors');

const paymentIntentsRouter = require('./routes/paymentIntents');
const webhookRouter = require('./routes/webhooks');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

// El webhook necesita el cuerpo raw; se registra antes del parser JSON global.
app.use('/webhook', webhookRouter);

app.use(express.json());

app.use('/api', paymentIntentsRouter);

app.get('/', (_req, res) => {
  return res.json({
    success: true,
    message: 'Fintoc sandbox backend is running',
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
