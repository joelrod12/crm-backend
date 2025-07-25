const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwt');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

    const token = createToken({ id: user.id, email: user.email, name: user.name });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
