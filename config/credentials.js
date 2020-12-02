const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

module.exports = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_OPTIONS: process.env.DB_OPTIONS,
};
