const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwt');

// login
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

// registro
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Validar campos básicos
    if (!name || !email || !password) return res.status(400).json({ message: 'Faltan datos' });

    // Verificar si usuario ya existe
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });

    // Crear usuario
    await userModel.createUser({ name, email, password });

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    next(error);
  }
}

//cierre de sesion
async function logout(req, res) {
  // En sistemas sin blacklist, no hay nada que hacer en backend
  // Sólo responder que la sesión terminó y el cliente debe borrar el token
  res.json({ message: 'Logout exitoso. Por favor, borra tu token en el cliente.' });
}



module.exports = {
  login,
  register,
  logout,
};
