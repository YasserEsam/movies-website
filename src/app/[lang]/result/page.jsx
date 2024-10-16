import React from 'react';
import { fetchData } from '@/utils/api';
import MediaSection from '@/components/MediaSection';

// This is now a server component by default in the app directory
export default async function ResultPage({ searchParams }) {
  const query = searchParams.query || ''; // Get the query parameter from URL
  let results = [];

  if (query) {
    try {
      // Use the `/search/movie` endpoint to search for movies only
      const data = await fetchData('/search/movie', 'en', { query });
      results = data.results || [];
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  // Map the API results to the format expected by the MediaSection component
  const mediaItems = results.map((result) => ({
    id: result.id,
    title: result.title,
    imageUrl: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : null,
    genre: 'movie', // Set genre to 'movie' as we're only searching for movies
    additionalInfo: result.overview || 'No description available',
    release_date: result.release_date,
    vote_average: result.vote_average,
    type: `/movies/${result.id}`, // Dynamic path for movie details
  }));

  return (
    <div>
      {mediaItems.length > 0 ? (
        <MediaSection
          title={`Results for "${query}"`}
          mediaItems={mediaItems}
          lang="en"
          isTaged={false}
          type="movies"
        />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
