// Simple in-memory cache implementation
const cache = new Map();
const CACHE_EXPIRY = 3600 * 1000; // 1 hour in milliseconds

async function getCachedResponse(message) {
  try {
    const key = generateCacheKey(message);
    const cachedItem = cache.get(key);

    if (cachedItem && Date.now() < cachedItem.expiry) {
      return cachedItem.response;
    }

    return null;
  } catch (error) {
    console.error(`Error getting cached response: ${error.message}`);
    return null;
  }
}

async function cacheResponse(message, response) {
  try {
    const key = generateCacheKey(message);
    cache.set(key, {
      response,
      expiry: Date.now() + CACHE_EXPIRY
    });
  } catch (error) {
    console.error(`Error caching response: ${error.message}`);
  }
}

function generateCacheKey(message) {
  // Simple key generation
  return `chatbot:${Buffer.from(message).toString('base64')}`;
}

module.exports = { getCachedResponse, cacheResponse };