const { poolPromise, sql } = require('../config/db');

async function getLeads() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Leads');
  return result.recordset;
}

async function createLead({ name, email, message }) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('name', sql.VarChar, name)
    .input('email', sql.VarChar, email)
    .input('message', sql.Text, message)
    .query('INSERT INTO Leads (name, email, message) VALUES (@name, @email, @message)');
  return result;
}

module.exports = {
  getLeads,
  createLead,
};
