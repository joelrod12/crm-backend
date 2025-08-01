const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');
const authMiddleware = require('../middleware/auth.middleware');


/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Crear un nuevo lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *               phone:
 *                 type: string
 *                 example: "555-123-4567"

 *     responses:
 *       201:
 *         description: Lead creado exitosamente
 *       400:
 *         description: Email inválido
 */
router.post('/', leadController.addLead);
router.use(authMiddleware);
/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Obtener todos los leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 */
router.get('/', leadController.getAllLeads);



module.exports = router;
