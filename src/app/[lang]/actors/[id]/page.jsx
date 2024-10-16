import React from 'react';
import { fetchData } from '@/utils/api';
import Card from '@/components/Card';

export const metadata = {
  title: "Actor - Movies App",
  description: 'Actor page',
}



export default async function ActorPage({ params: { id, lang } }) {
  const FetchActorDetails = async (lang) => {
    return await fetchData(`/person/${id}`, lang);
  };

  const FetchActorMovies = async (lang) => {
    return await fetchData(`/person/${id}/movie_credits`, lang);
  };

  let actorData;
  let moviesData;

  try {
    actorData = await FetchActorDetails(lang);
    moviesData = await FetchActorMovies(lang);
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const actor = {
    id: actorData.id,
    name: actorData.name,
    biography: actorData.biography || 'No biography available.',
    profileUrl: `https://image.tmdb.org/t/p/w500${actorData.profile_path}`,
    birthday: actorData.birthday,
    placeOfBirth: actorData.place_of_birth,
    gender: actorData.gender === 1 ? 'Female' : 'Male',
    knownFor: moviesData.cast.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex flex-col items-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start gap-8">
        {/* Actor Profile Section */}
        <div className="flex-shrink-0 w-full lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            className="rounded-full w-48 h-48 object-cover mx-auto"
            src={actor.profileUrl}
            alt={`${actor.name}'s profile`}
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mt-4">{actor.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
            Born: {actor.birthday} in {actor.placeOfBirth}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Gender: {actor.gender}</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Biography</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{actor.biography}</p>
        </div>

        {/* Known For Section */}
        <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Known For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
            {actor.knownFor.length > 0 ? (
              actor.knownFor.slice(0, 12).map((movie) => (
                <Card
                  key={movie.id}
                  title={movie.title}
                  imageUrl={movie.posterUrl}
                  genre={movie.releaseDate}
                  type={`/movies/${movie.id}`}
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No movies found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
