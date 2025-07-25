async function notifyNewLead({ name, email, message }) {
  // Aquí puedes integrar envío de email o mensaje a Slack
  console.log(`Nuevo lead creado: ${name} - ${email} - ${message}`);
}

module.exports = {
  notifyNewLead,
};
