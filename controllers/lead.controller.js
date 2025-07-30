const leadModel = require('../models/lead.model');
const notificationService = require('../services/notificationService');
const { sanitizeString, validateEmail } = require('../utils/validator');

async function getAllLeads(req, res, next) {
  try {
    const leads = await leadModel.getLeads();
    res.json(leads);
  } catch (error) {
    next(error);
  }
}

async function addLead(req, res, next) {
  try {
    let { name, email, message, phone } = req.body;

    name = sanitizeString(name);
    message = sanitizeString(message);
    phone = sanitizeString(phone); // limpieza básica del número

    if (!validateEmail(email)) return res.status(400).json({ message: 'Email inválido' });

    await leadModel.createLead({ name, email, message, phone });
    await notificationService.notifyNewLead({ name, email, message, phone });

    res.status(201).json({ message: 'Lead creado exitosamente' });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAllLeads,
  addLead,
};
