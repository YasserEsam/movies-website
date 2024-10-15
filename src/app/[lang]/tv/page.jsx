import { fetchData } from "@/utils/api";
import { getDictionary } from "../dictionaries";
import AllTv from "@/components/AllTv";

const fetchAllTvShows = async () => {
  return await fetchData(`/discover/tv`);
};

export default async function TvShows({ params: { lang } }) {
  const dict = await getDictionary(lang);

  let tvData;
  try {
    tvData = await fetchAllTvShows();
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const tvs = tvData.results.map(tv => ({
    title: tv.original_name,
    imageUrl: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    genre: tv.adult ? 'Adult' : 'Kids',
    additionalInfo: tv.first_air_date, 
  }));



  return (
    <>
      <AllTv lang={lang} mediaItems={tvs} />
    </>
  );
}
