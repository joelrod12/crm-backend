const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcryptjs');

async function findUserByEmail(email) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT * FROM Users WHERE email = @email');
  return result.recordset[0];
}

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const pool = await poolPromise;
  await pool.request()
    .input('name', sql.VarChar, name)
    .input('email', sql.VarChar, email)
    .input('password', sql.VarChar, hashedPassword)
    .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');
}

module.exports = {
  findUserByEmail,
  createUser,
};
