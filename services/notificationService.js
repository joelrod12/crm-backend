// services/notificationService.js
const axios = require('axios');

const sendNotification = async (lead) => {
    try {
        // Ejemplo con Slack webhook
        await axios.post(process.env.SLACK_WEBHOOK_URL, {
            text: `📥 Nuevo lead: ${lead.name} - ${lead.email}`,
        });
    } catch (error) {
        console.error('Error enviando notificación:', error.message);
    }
};

module.exports = { sendNotification };
