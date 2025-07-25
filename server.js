// server.js
const express = require('express');
const app = express();
require('dotenv').config();

const leadRoutes = require('./routes/lead.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

// Rutas públicas y protegidas
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes); // protegidas con authMiddleware dentro de leadRoutes

// Middleware para manejo de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
