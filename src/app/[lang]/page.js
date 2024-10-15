import Hero from '@/components/Hero';
import MediaSection from '@/components/MediaSection';
import { getDictionary } from './dictionaries';
import { fetchData } from '@/utils/api';

const fetchTrendingMovies = async (lang) => {
  const timeWindow = 'day'; 
  return await fetchData(`/trending/movie/${timeWindow}`, lang);
};

const fetchTrendingActors = async (lang) => {
  const timeWindow = 'day';
  return await fetchData(`/trending/person/${timeWindow}`, lang);
};

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);

  let moviesData, actorsData;
  try {
    moviesData = await fetchTrendingMovies(lang);
    actorsData = await fetchTrendingActors(lang);
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const movies = moviesData.results.slice(0, 8).map(movie => ({
    title: movie.title,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genre: movie.adult ? 'Adult' : 'Kids',
    additionalInfo: movie.release_date.split('-')[0], 
  }));

  const actors = actorsData.results.slice(0, 8).map(actor => ({
    title: actor.name,
    imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
    genre: actor.known_for_department,
    additionalInfo: '', 
  }));

  return (
    <>
      <Hero lang={lang} />
      <MediaSection title={dict.Landing.TrendingMovies} lang={lang}  mediaItems={movies} link={'/movies'} />
      <MediaSection title={dict.Landing.TrendingActors} lang={lang} mediaItems={actors} link={'/actors'} />
    </>
  );
}
