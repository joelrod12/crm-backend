const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // protege todas las rutas de leads

router.get('/', leadController.getAllLeads);
router.post('/', leadController.addLead);

module.exports = router;
