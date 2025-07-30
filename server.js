const express = require('express');
const cors = require('cors'); // 👈 Importa cors
const app = express();
require('dotenv').config();
const { swaggerUi, specs } = require('./docs/swagger');

const leadRoutes = require('./routes/lead.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

// 👉 Habilita CORS para permitir peticiones desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al dominio de tu frontend si lo despliegas
  credentials: true,
}));

// Swagger docs disponible en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Middleware de errores
app.use(errorMiddleware);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});
