"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MediaSection from './MediaSection';
import { fetchData } from '@/utils/api';
import Spinner from './Spinner';
import Pagination from './Pagination';

export default function AllMovies({ lang }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromQuery = parseInt(searchParams.get('page')) || 1;

  const initialFilters = {
    sort_by: 'popularity.desc',
    include_adult: false,
    primary_release_year: '',
    with_genres: '',
    with_original_language: '',
    page: pageFromQuery,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [tempFilters, setTempFilters] = useState(initialFilters);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

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
        setTotalPages(moviesData.total_pages);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
      } finally {
        setLoading(false);
        setIsFiltering(false);
      }
    };

    fetchAllMovies();
  }, [lang, filters]);

  const handleFilterChange = (e) => {
    setTempFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    setIsFiltering(true);
    setFilters((prev) => ({
      ...tempFilters,
      page: 1,
    }));
    router.push('?page=1');
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    router.push(`?page=${newPage}`);
  };

  if (loading && isFiltering) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex container mx-auto py-10 px-4">
      <div className="dark:bg-gray-800 bg-gray-200 text-white p-6 rounded-lg shadow-lg max-w-xs w-full mr-4">
        <h2 className="text-center text-2xl font-bold mb-4 dark:text-white text-black ">
          {lang === 'ar' ? 'خيارات الفلترة' : 'Filter Options'}
        </h2>
        <div className="flex flex-col">
          {/* Sort By */}
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">
            {lang === 'ar' ? 'ترتيب حسب' : 'Sort By'}
          </label>
          <select
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 bg-gray-100 dark:text-white text-black"
            name="sort_by"
            value={tempFilters.sort_by}
            onChange={handleFilterChange}
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="release_date.desc">Newest</option>
            <option value="vote_average.desc">Highest Rated</option>
          </select>

          {/* Release Year */}
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">
            {lang === 'ar' ? 'سنة الإصدار' : 'Release Year'}
          </label>
          <select
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 bg-gray-100 dark:text-white text-black"
            name="primary_release_year"
            value={tempFilters.primary_release_year}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>

          {/* Genres */}
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">
            {lang === 'ar' ? 'النوع' : 'Genres'}
          </label>
          <select
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 bg-gray-100 dark:text-white text-black"
            name="with_genres"
            value={tempFilters.with_genres}
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

          {/* Language */}
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">
            {lang === 'ar' ? 'اللغة' : 'Language'}
          </label>
          <select
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 bg-gray-100 dark:text-white text-black"
            name="with_original_language"
            value={tempFilters.with_original_language}
            onChange={handleFilterChange}
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="es">Spanish</option>
          </select>
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
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            <MediaSection
              title={lang === 'ar' ? 'جميع الأفلام' : 'All Movies'}
              mediaItems={movies}
              lang={lang}
              isTaged={false}
              type="movies"
            />

            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
