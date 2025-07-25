const pool = require('../config/db');

async function getLeads() {
  const [rows] = await pool.query('SELECT * FROM Leads');
  return rows;
}

async function createLead({ name, email, message }) {
  const [result] = await pool.query(
    'INSERT INTO Leads (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );
  return result;
}

module.exports = {
  getLeads,
  createLead,
};
