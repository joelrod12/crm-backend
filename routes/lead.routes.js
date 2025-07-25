const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', leadController.getAllLeads);
router.post('/', leadController.addLead);

module.exports = router;
