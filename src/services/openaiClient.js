import OpenAI from 'openai';

/**
 * Validates OpenAI API key format
 * @param {string} apiKey - API key to validate
 * @returns {boolean} Whether the API key format is valid
 */
const validateAPIKey = (apiKey) => {
  if (!apiKey) {
    console.error('OpenAI API key is missing from environment variables');
    return false;
  }

  // OpenAI API keys should start with 'sk-' and be at least 48 characters long
  if (!apiKey.startsWith('sk-') || apiKey.length < 48) {
    console.error('OpenAI API key format is invalid. Expected format: sk-...');
    return false;
  }

  return true;
};

/**
 * Initializes the OpenAI client with proper error handling
 * @returns {OpenAI|null} Configured OpenAI client instance or null if invalid
 */
const initializeOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!validateAPIKey(apiKey)) {
    console.warn('OpenAI client not initialized due to invalid API key. AI features will use fallback responses.');
    return null;
  }

  try {
    return new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage in React
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    return null;
  }
};

const openai = initializeOpenAI();

/**
 * Makes a safe API call to OpenAI with error handling
 * @param {Function} apiCall - The OpenAI API call function
 * @param {string} operation - Description of the operation for logging
 * @returns {Promise} API response or throws error with context
 */
export const safeOpenAICall = async (apiCall, operation = 'OpenAI API call') => {
  if (!openai) {
    throw new Error(`OpenAI client not available. Cannot perform ${operation}. Please check your API key configuration.`);
  }

  try {
    const response = await apiCall(openai);
    return response;
  } catch (error) {
    console.error(`Error in ${operation}:`, error);
    
    // Enhanced error handling with specific error types
    if (error.status === 401) {
      throw new Error(`OpenAI API authentication failed. Please verify your API key is correct and active.`);
    } else if (error.status === 429) {
      throw new Error(`OpenAI API rate limit exceeded. Please try again later.`);
    } else if (error.status === 403) {
      throw new Error(`OpenAI API access forbidden. Check your account permissions and billing status.`);
    } else if (error.status >= 500) {
      throw new Error(`OpenAI service temporarily unavailable. Please try again later.`);
    } else {
      throw new Error(`OpenAI API error: ${error.message || 'Unknown error occurred'}`);
    }
  }
};

/**
 * Checks if OpenAI client is available
 * @returns {boolean} Whether OpenAI client is properly initialized
 */
export const isOpenAIAvailable = () => {
  return openai !== null;
};

export default openai;