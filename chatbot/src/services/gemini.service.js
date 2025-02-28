
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

function initGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
}

async function generateResponse(message) {
  try {
    if (!genAI || !model) {
      initGemini();
    }
    
    const result = await model.generateContent(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error(`Error generating Gemini AI response: ${error.message}`);
    throw new Error('Failed to generate AI response');
  }
}

// Initialize Gemini when module is loaded
initGemini();

module.exports = { generateResponse };
