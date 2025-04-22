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
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
            {lang === 'ar' ? 'حدث خطأ في تحميل البيانات' : 'Error loading data'}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {lang === 'ar' ? 'الرجاء المحاولة مرة أخرى لاحقًا' : 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  const actor = {
    id: actorData.id,
    name: actorData.name,
    biography: actorData.biography || (lang === 'ar' ? 'لا يوجد سيرة ذاتية متاحة' : 'No biography available'),
    profileUrl: actorData.profile_path 
      ? `https://image.tmdb.org/t/p/h632${actorData.profile_path}`
      : '/default-actor.jpg',
    birthday: actorData.birthday,
    placeOfBirth: actorData.place_of_birth,
    gender: actorData.gender === 1 ? (lang === 'ar' ? 'أنثى' : 'Female') : (lang === 'ar' ? 'ذكر' : 'Male'),
    imdbId: actorData.imdb_id,
    knownFor: moviesData.cast
      .sort((a, b) => new Date(b.release_date || '9999') - new Date(a.release_date || '9999'))
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '/default-movie.jpg',
        releaseDate: movie.release_date,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
        rating: movie.vote_average,
        character: movie.character || '',
      })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Actor Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Actor Profile Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700">
              <img
                src={actor.profileUrl}
                alt={actor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Actor Info */}
          <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{actor.name}</h1>
            
            {/* Actor Metadata */}
            <div className="flex flex-wrap gap-4 mb-6">
              {actor.birthday && (
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    {lang === 'ar' ? 'تاريخ الميلاد:' : 'Born:'} {actor.birthday}
                  </span>
                </div>
              )}
              {actor.placeOfBirth && (
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    {lang === 'ar' ? 'مكان الميلاد:' : 'From:'} {actor.placeOfBirth}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === 'ar' ? 'الجنس:' : 'Gender:'} {actor.gender}
                </span>
              </div>
              {actor.imdbId && (
                <a 
                  href={`https://www.imdb.com/name/${actor.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors"
                >
                  <span>IMDb</span>
                </a>
              )}
            </div>

            {/* Biography */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {lang === 'ar' ? 'السيرة الذاتية' : 'Biography'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {actor.biography.split('\n').map((paragraph, i) => (
                  <React.Fragment key={i}>
                    {paragraph}
                    <br /><br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Known For Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {lang === 'ar' ? 'معروف بـ' : 'Known For'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {actor.knownFor.length > 0 ? (
              actor.knownFor.slice(0, 10).map((movie) => (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={movie.posterUrl}
                  genre={movie.year}
                  additionalInfo={movie.character}
                  type={`/movies/${movie.id}`}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                {lang === 'ar' ? 'لا توجد أفلام متاحة' : 'No movies available'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}