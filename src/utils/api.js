const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Fetch data from TMDB API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - Additional fetch options (method, headers, etc.)
 * @returns {Promise<Object>} - The response data
 */
export const fetchData = async (endpoint, options = {}) => {
  let language = 'en'; // Default language

  // Check if running in the browser
  if (typeof window !== 'undefined') {
    // Determine the language from the URL
    const pathSegments = window.location.pathname.split('/');
    const langSegment = pathSegments[1]; // Get the language segment from the URL

    // Validate and set language from URL
    if (langSegment === 'ar' || langSegment === 'en') {
      language = langSegment;
    } else {
      console.warn(`Unsupported language segment "${langSegment}". Defaulting to English.`);
    }
  }

  // Log the chosen language for debugging purposes
  console.log('Using language for fetch:', language);

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}`;

  try {
    const response = await fetch(url, options);

    // Handle non-2xx HTTP responses
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Optional: Log the fetched data for further debugging
    console.log('Fetched data:', data);

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw the error for further handling
  }
};
