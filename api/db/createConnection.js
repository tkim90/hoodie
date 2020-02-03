const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config()

const createDatabaseConnection = () => {
  return new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });
}

module.exports = createDatabaseConnection;
