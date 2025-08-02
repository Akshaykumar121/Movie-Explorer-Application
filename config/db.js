require('dotenv').config();  // Load variables from .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASS,       // Password
  {
    host: process.env.DB_HOST,    // Host from .env
    dialect: process.env.DB_DIALECT,  // 'mssql'
    dialectOptions: {
      options: {
        encrypt: false,       // Set to true if using Azure or encryption is required
        enableArithAbort: true
      }
    },
    logging: false           // Disable SQL logging, set to true if you want to debug
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
