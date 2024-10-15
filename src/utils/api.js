// src/utils/api.js
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Fetch data from TMDB API
 * @param {string} endpoint - The API endpoint to call
 * @param {string} language - The language code (e.g., 'en', 'ar')
 * @param {Object} filters - Additional filter options (e.g., genre, sort_by)
 * @param {Object} options - Additional fetch options (method, headers, etc.)
 * @returns {Promise<Object>} - The response data
 */
export const fetchData = async (endpoint, language = 'en', filters = {}, options = {}) => {
  console.log('Using language for fetch:', language);

  // Construct the query string based on filters
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language,
    ...filters, // Spread the filters object to dynamically add the query params
  }).toString();

  const url = `${BASE_URL}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
