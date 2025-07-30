const pool = require('../config/db');

async function getLeads() {
  const [rows] = await pool.query('SELECT * FROM Leads');
  return rows;
}

async function createLead({ name, email, message, phone }) {
  const [result] = await pool.query(
    'INSERT INTO Leads (name, email, message, phone) VALUES (?, ?, ?, ?)',
    [name, email, message, phone]
  );
  return result;
}

module.exports = {
  getLeads,
  createLead,
};
