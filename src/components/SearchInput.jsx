import { FaSearch } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { fetchData } from '@/utils/api';

export default function SearchInput({ placeholder = 'Search...' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  // Debounced function to fetch suggestions
  const fetchSuggestions = debounce(async (query) => {
    if (query.trim().length > 0) {
      try {
        const data = await fetchData('/search/multi', 'en', { query });
        setSuggestions(data.results || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/en/result?query=${encodeURIComponent(searchTerm)}`);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchSuggestions(query);
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.title || suggestion.name;
    setSearchTerm(query);
    router.push(`/en/result?query=${encodeURIComponent(query)}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative flex items-center w-full">
        <FaSearch
          className="absolute left-3 text-gray-500 dark:text-gray-300 cursor-pointer"
          onClick={handleIconClick}
        />
        <input
          ref={inputRef}
          type="text"
          className="pl-10 pr-4 py-2 w-full text-sm rounded bg-gray-200 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      {/* Advanced Dropdown for suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {/* Movie poster or profile image */}
              <img
                src={
                  suggestion.poster_path
                    ? `https://image.tmdb.org/t/p/w45${suggestion.poster_path}` // Use a small image size for the dropdown
                    : suggestion.profile_path
                    ? `https://image.tmdb.org/t/p/w45${suggestion.profile_path}`
                    : '/placeholder.png' // Fallback if no image is available
                }
                alt={suggestion.title || suggestion.name}
                className="w-10 h-14 rounded-md object-cover mr-3"
              />
              <div className="flex-1">
                {/* Title or name */}
                <p className="text-sm font-semibold dark:text-gray-100">{suggestion.title || suggestion.name}</p>
                {/* Release date or known for */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {suggestion.release_date ? `Release: ${suggestion.release_date}` : suggestion.first_air_date ? `First Aired: ${suggestion.first_air_date}` : suggestion.known_for_department || 'N/A'}
                </p>
                {/* Media type (movie, tv, person) */}
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {suggestion.media_type === 'movie'
                    ? 'Movie'
                    : suggestion.media_type === 'tv'
                    ? 'TV Show'
                    : suggestion.media_type === 'person'
                    ? 'Person'
                    : 'Unknown'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
