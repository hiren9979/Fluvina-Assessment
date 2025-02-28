
# Express Chatbot API

A simple chatbot API that connects to Google's Gemini API and uses in-memory caching.

## Features

- Process user messages through Google's Gemini AI model
- In-memory caching for improved performance
- Error handling and validation
- Rate limiting to prevent abuse
- Secure API key management

## Setup

1. Copy the `.env.example` file to `.env` and set your environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   node index.js
   ```

## API Usage

Send POST requests to `/chatbot` with the following JSON body:
```json
{
  "message": "Your message here"
}
```

## Response Format

```json
{
  "response": "AI-generated response",
  "source": "ai" // or "cache" if response was cached
}
```

## Rate Limiting

The API has rate limiting implemented: 10 requests per minute per IP address.
