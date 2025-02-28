
const { OpenAI } = require('openai');

let openai = null;

function initOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  openai = new OpenAI({
    apiKey: apiKey,
  });
}

async function generateResponse(message) {
  try {
    if (!openai) {
      initOpenAI();
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use "gpt-4" for better responses
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error generating AI response: ${error.message}`);
    throw new Error('Failed to generate AI response');
  }
}

// Initialize OpenAI when module is loaded
initOpenAI();

module.exports = { generateResponse };
