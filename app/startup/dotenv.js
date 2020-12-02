const dotenv = require('dotenv');

module.exports = () => {
  const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  const config = dotenv.config({ path: envFile });

  if (config.error) {
    throw new Error(config.error);
  }
};
