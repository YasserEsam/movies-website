import { fetchData } from "@/utils/api";
import { getDictionary } from "../dictionaries";
import AllMovies from "@/components/AllMovies";

const fetchAllMovies = async (lang) => {
  return await fetchData(`/discover/movie`, lang);
};

export default async function Movies({ params: { lang } }) {
  const dict = await getDictionary(lang);

  let moviesData;
  try {
    moviesData = await fetchAllMovies(lang);
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const movies = moviesData.results.map(movie => ({
    title: movie.title,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genre: movie.adult ? 'Adult' : 'Kids',
    additionalInfo: movie.release_date.split('-')[0], 
  }));



  return (
    <>
      <AllMovies lang={lang} mediaItems={movies} />
    </>
  );
}
