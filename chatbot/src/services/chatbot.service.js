
const redisService = require('./redis.service');
const geminiService = require('./gemini.service');

async function processMessage(message) {
  try {
    // Get response from Gemini AI service
    const aiResponse = await geminiService.generateResponse(message);
    
    // Cache the response
    await redisService.cacheResponse(message, aiResponse);
    
    return { response: aiResponse, source: 'ai' };
  } catch (error) {
    console.error(`Error processing message: ${error.message}`);
    throw error;
  }
}

module.exports = { processMessage };
