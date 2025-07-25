const express = require('express');
const app = express();
require('dotenv').config();
const { swaggerUi, specs } = require('./docs/swagger'); // 👈 Importa swagger

const leadRoutes = require('./routes/lead.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

// Swagger docs disponible en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});
