import React from 'react';
import { fetchData } from '@/utils/api';
import Card from '@/components/Card';

export default async function page({ params: { id, lang } }) {
  const FetchSpecificMovie = async (lang) => {
    const movieId = id;
    return await fetchData(`/movie/${movieId}`, lang);
  };

  const FetchMovieCast = async (lang) => {
    const movieId = id;
    return await fetchData(`/movie/${movieId}/credits`, lang);
  };

  const FetchMovieVideos = async () => {
    const movieId = id;
    return await fetchData(`/movie/${movieId}/videos`);
  };

  let movieData;
  let castData;
  let videoData;

  try {
    movieData = await FetchSpecificMovie(lang);
    castData = await FetchMovieCast(lang);
    videoData = await FetchMovieVideos(lang);
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const movie = {
    id: movieData.id,
    title: movieData.title,
    posterUrl: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
    backdropUrl: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
    genre: movieData.genres.map((genre) => genre.name).join(', '),
    additionalInfo: movieData.release_date.split('-')[0],
    releaseDate: movieData.release_date,
    originalLanguage: movieData.original_language.toUpperCase(),
    status: movieData.status,
    popularity: movieData.popularity.toFixed(1),
    overview: movieData.overview,
    rating: movieData.vote_average.toFixed(1),
    runtime: `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m`,
    tagline: movieData.tagline,
    budget: movieData.budget,
    revenue: movieData.revenue,
    productionCompanies: movieData.production_companies.map(company => company.name).join(', '),
    trailerKey: videoData.results.length > 0 ? videoData.results[0].key : null, // Get the first trailer key
  };

  // Prepare cast data for cards
  const mediaItems = castData.cast.slice(0, 8).map((actor) => ({
    id: actor.id,
    title: actor.name,
    imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
    genre: actor.character, // Assuming character is the role played by the actor
    additionalInfo: null, // Add more details if needed
    type: `/actors/${actor.id}`, // Link to the actor's details page
  }));

  return (
    <div
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900 py-8"
      style={{
        backgroundImage: `url(${movie.backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-start gap-8">
      <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            className="rounded-2xl object-cover w-full shadow-lg"
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
          />
          
          {/* Additional Info Under the Image with Background */}
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md opacity-80">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Release Date:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.releaseDate}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Original Language:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.originalLanguage}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Status:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.status}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Popularity:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.popularity}</span>
            </div>
          </div>
        </div>

        {/* Movie Details on the Right */}
        <div className="overflow-hidden w-full lg:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
          {/* Movie Title and Tagline */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {movie.title}
          </h1>
          {movie.tagline && (
            <h2 className="text-lg font-semibold text-indigo-500 italic mb-4">
              {`"${movie.tagline}"`}
            </h2>
          )}

          {/* Overview */}
          <p className="text-gray-800 dark:text-gray-200 text-base mb-6 leading-relaxed">
            {movie.overview}
          </p>

          {/* Movie Metadata */}
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Rating:</span>
              <span className="text-lg font-bold text-yellow-500">{movie.rating}/10</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Runtime:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.runtime}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Genres:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.genre}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Release Year:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.additionalInfo}</span>
            </div>
          </div>

          {/* Budget and Revenue */}
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Budget:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Revenue:</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
              </span>
            </div>
          </div>

          {/* Production Companies */}
          <div className="flex items-center mb-6">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 mx-2">Production Companies:</span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.productionCompanies || 'N/A'}</span>
          </div>

          {/* Cast Section */}
          <div className="container mx-auto px-4 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{lang === 'ar' ? 'الممثلين' : 'Cast'}</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {mediaItems.map((actor) => (
                <Card
                  key={actor.id}
                  title={actor.title}
                  imageUrl={actor.imageUrl}
                  genre={actor.genre}
                  additionalInfo={actor.additionalInfo}
                  type={actor.type}
                />
              ))}
            </div>
          </div>
          {movie.trailerKey && (
            <div className="container mx-auto px-4 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trailer</h2>
              <iframe
                className="w-full h-64 md:h-96 rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
