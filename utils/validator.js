function sanitizeString(str) {
  return String(str).replace(/[^a-z0-9áéíóúñü .,_-]/gi, '');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  sanitizeString,
  validateEmail,
};
