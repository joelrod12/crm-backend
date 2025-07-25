// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini CRM de Leads',
            version: '1.0.0',
            description: 'API para gestionar leads y autenticación',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Aquí apuntas a tus archivos de rutas
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
