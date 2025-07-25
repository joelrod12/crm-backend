const leadModel = require('../models/leadModel');
const notificationService = require('../services/notificationService');

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
    const { name, email, message } = req.body;
    await leadModel.createLead({ name, email, message });
    await notificationService.notifyNewLead({ name, email, message });
    res.status(201).json({ message: 'Lead creado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllLeads,
  addLead,
};
