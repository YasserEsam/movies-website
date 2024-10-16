"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import necessary Next.js hooks
import MediaSection from './MediaSection';
import { fetchData } from '@/utils/api';
import Spinner from './Spinner'; // Assuming there's a Spinner component for loading
import Pagination from './Pagination'; // Import the Pagination component

export default function AllMovies({ lang }) {
  const router = useRouter(); // Use router to manipulate the URL
  const searchParams = useSearchParams(); // To get the query params

  // Get the page from the query string, defaulting to 1 if not present
  const pageFromQuery = parseInt(searchParams.get('page')) || 1;
  const [filters, setFilters] = useState({
    sort_by: 'popularity.desc',
    include_adult: false,
    primary_release_year: '',
    with_genres: '',
    with_original_language: '',
    with_production_countries: '',
    with_watch_providers: '',
    page: pageFromQuery, // Initialize page from query parameter
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await fetchData(`/discover/movie`, lang, filters);
        const formattedMovies = moviesData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          genre: movie.adult ? 'Adult' : 'Kids',
          additionalInfo: movie.release_date.split('-')[0],
        }));
        setMovies(formattedMovies);
        setTotalPages(moviesData.total_pages); // Set total pages for pagination
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [lang, filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1, // Reset to the first page when applying new filters
    }));
    router.push('?page=1'); // Reset to the first page in the URL
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage, // Update the page number in filters
    }));
    router.push(`?page=${newPage}`); // Update the URL with the new page number
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Filter Options */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-8">
        <h2 className="text-center text-2xl font-bold mb-4">
          {lang === 'ar' ? 'خيارات الفلترة' : 'Filter Options'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'ترتيب حسب' : 'Sort By'}
            </label>
            <select
              className="w-full p-2 border rounded"
              name="sort_by"
              value={filters.sort_by}
              onChange={handleFilterChange}
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="release_date.desc">Newest</option>
              <option value="vote_average.desc">Highest Rated</option>
            </select>
          </div>

          {/* Release Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'سنة الإصدار' : 'Release Year'}
            </label>
            <select
              className="w-full p-2 border rounded"
              name="primary_release_year"
              value={filters.primary_release_year}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              {/* ... */}
            </select>
          </div>

          {/* Include Adult */}
          <div className="flex items-center">
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'تشمل الأفلام للكبار' : 'Include Adult'}
            </label>
            <input
              className="ml-2"
              type="checkbox"
              name="include_adult"
              checked={filters.include_adult}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  include_adult: !filters.include_adult,
                }))
              }
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'النوع' : 'Genres'}
            </label>
            <select
              className="w-full p-2 border rounded"
              name="with_genres"
              value={filters.with_genres}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
              <option value="16">Animation</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="10749">Romance</option>
              <option value="27">Horror</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'اللغة' : 'Language'}
            </label>
            <select
              className="w-full p-2 border rounded"
              name="with_original_language"
              value={filters.with_original_language}
              onChange={handleFilterChange}
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={applyFilters}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {lang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
          </button>
        </div>
      </div>

      {/* Movies Section */}
      <MediaSection
        title={lang === 'ar' ? 'جميع الأفلام' : 'All Movies'}
        mediaItems={movies}
        lang={lang}
        isTaged={false}
        type="movies"
      />

      {/* Pagination Section */}
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
