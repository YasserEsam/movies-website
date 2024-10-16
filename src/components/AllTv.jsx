"use client";

import React, { useState, useEffect } from 'react';
import MediaSection from './MediaSection';
import { fetchData } from '@/utils/api';
import Spinner from './Spinner';
import Pagination from './Pagination'; // Import the Pagination component

export default function AllTv({ lang }) {
  const [tvs, setTvs] = useState([]);
  const [filters, setFilters] = useState({
    sort_by: 'popularity.desc',
    include_adult: false,
    first_air_date_year: '',
    with_genres: '',
    with_original_language: '',
    page: 1, // Pagination page state
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

  useEffect(() => {
    const fetchAllTvShows = async () => {
      setLoading(true);
      try {
        const tvData = await fetchData(`/discover/tv`, lang, appliedFilters);
        const formattedTvShows = tvData.results.map((tv) => ({
          id: tv.id,
          title: tv.original_name,
          imageUrl: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          genre: tv.adult ? 'Adult' : 'Kids',
          additionalInfo: tv.first_air_date.split('-')[0],
        }));
        setTvs(formattedTvShows);
        setTotalPages(tvData.total_pages); // Set total pages for pagination
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTvShows();
  }, [lang, appliedFilters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage, // Update the page number in filters
    }));
    setAppliedFilters((prev) => ({
      ...prev,
      page: newPage, // Apply the new page
    }));
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
              <option value="first_air_date.desc">Newest</option>
              <option value="vote_average.desc">Highest Rated</option>
            </select>
          </div>

          {/* First Air Date Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'سنة البث الأول' : 'First Air Date Year'}
            </label>
            <select
              className="w-full p-2 border rounded"
              name="first_air_date_year"
              value={filters.first_air_date_year}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
            </select>
          </div>

          {/* Include Adult */}
          <div className="flex items-center">
            <label className="block text-sm font-medium mb-1">
              {lang === 'ar' ? 'تشمل عروض للكبار' : 'Include Adult'}
            </label>
            <input
              className="ml-2"
              type="checkbox"
              name="include_adult"
              checked={filters.include_adult}
              onChange={() =>
                setFilters((prev) => ({ ...prev, include_adult: !filters.include_adult }))
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
              <option value="18">Drama</option>
              <option value="35">Comedy</option>
              <option value="10765">Sci-Fi & Fantasy</option>
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

      {/* TV Shows Section */}
      <MediaSection
        title={lang === 'ar' ? 'جميع العروض التلفزيونية' : 'All TV Shows'}
        mediaItems={tvs}
        lang={lang}
        isTaged={false}
        type="tv"
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
