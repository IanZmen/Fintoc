const { Fintoc } = require('fintoc');

function createFintocClient() {
  const secretKey = process.env.FINTOC_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Missing FINTOC_SECRET_KEY in environment variables');
  }

  return new Fintoc(secretKey);
}

const fintocClient = createFintocClient();

module.exports = { fintocClient };
