const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true
  },
  authentication: {
    type: 'ntlm',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      domain: process.env.DB_DOMAIN
    }
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error de conexión a SQL Server', err);
  });

module.exports = {
  sql,
  poolPromise
};
