const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbot.controller');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later.' }
});

router.use(limiter);

router.post('/chatbot', chatbotController.startChat);

module.exports = router;
