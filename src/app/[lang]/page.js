import Hero from '@/components/Hero';
import MediaSection from '@/components/MediaSection';
import { getDictionary } from './dictionaries';
import { fetchData } from '@/utils/api';

const fetchTrendingMovies = async () => {
  const timeWindow = 'week'; // or 'day'
  return await fetchData(`/trending/movie/${timeWindow}`);
};

const fetchTrendingActors = async () => {
  const timeWindow = 'week'; // or 'day'
  return await fetchData(`/trending/person/${timeWindow}`);
};

export default async function Home({ params: { lang } }) {
  // Fetch dictionary for localization
  const dict = await getDictionary(lang);
  
  // Fetch trending movies and actors
  let moviesData, actorsData;
  try {
    moviesData = await fetchTrendingMovies();
    actorsData = await fetchTrendingActors();
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>; // Display error message to the user
  }

  // Map movies data to desired format
  const movies = moviesData.results.map(movie => ({
    title: movie.title,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genre: movie.adult ? 'Adult' : 'Kids',
    additionalInfo: movie.release_date.split('-')[0], // Extract release year
  }));

  // Map actors data to desired format
  const actors = actorsData.results.map(actor => ({
    title: actor.name,
    imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
    genre: actor.known_for_department, // Department of the actor's work
    additionalInfo: '', // Placeholder for additional info
  }));

  return (
    <>
      <Hero lang={lang} />
      <MediaSection title={dict.Landing.TrendingMovies} mediaItems={movies} />
      <MediaSection title={dict.Landing.TrendingActors} mediaItems={actors} />
    </>
  );
}
