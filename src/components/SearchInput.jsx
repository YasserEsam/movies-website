import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { fetchData } from '@/utils/api';

export default function SearchInput({ placeholder = 'Search movies, TV shows, people...' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced function to fetch suggestions
  const fetchSuggestions = debounce(async (query) => {
    if (query.trim().length > 0) {
      setIsLoading(true);
      try {
        const data = await fetchData('/search/multi', 'en', { query });
        setSuggestions(data.results || []);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  }, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/en/result?query=${encodeURIComponent(searchTerm)}`);
      setIsDropdownVisible(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchSuggestions(query);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setSuggestions([]);
    setIsDropdownVisible(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.title || suggestion.name;
    setSearchTerm(query);
    router.push(`/en/result?query=${encodeURIComponent(query)}`);
    setIsDropdownVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsDropdownVisible(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <FaSearch
            className="absolute left-4 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            ref={inputRef}
            type="text"
            className="w-full pl-12 pr-10 py-2 text-base rounded-md bg-white dark:bg-gray-800 dark:text-gray-200   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length > 0 && setIsDropdownVisible(true)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isDropdownVisible && (
        <div 
          ref={dropdownRef}
          className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={`${suggestion.id}-${suggestion.media_type}`}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          suggestion.poster_path
                            ? `https://image.tmdb.org/t/p/w92${suggestion.poster_path}`
                            : suggestion.profile_path
                            ? `https://image.tmdb.org/t/p/w92${suggestion.profile_path}`
                            : '/placeholder.png'
                        }
                        alt={suggestion.title || suggestion.name}
                        className="w-12 h-16 rounded-md object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {suggestion.title || suggestion.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {suggestion.media_type === 'movie'
                            ? 'Movie'
                            : suggestion.media_type === 'tv'
                            ? 'TV Show'
                            : suggestion.media_type === 'person'
                            ? 'Person'
                            : 'Unknown'}
                        </span>
                        {suggestion.release_date && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(suggestion.release_date).getFullYear()}
                          </span>
                        )}
                        {suggestion.first_air_date && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(suggestion.first_air_date).getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}