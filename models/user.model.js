const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
}

module.exports = {
  findUserByEmail,
  createUser,
};
