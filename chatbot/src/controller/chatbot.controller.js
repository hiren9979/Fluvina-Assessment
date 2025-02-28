const { processMessage } = require('../services/chatbot.service');

const startChat =  async(req, res) => {
        try {
          const { message } = req.body;
          
          if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message cannot be empty' });
          }
          
          const response = await processMessage(message);
          res.json(response);
        } catch (error) {
          console.error('Error processing request:', error);
          res.status(500).json({ error: 'Failed to process your request' });
        }
};

module.exports = { startChat };