import { fetchData } from "@/utils/api";
import { getDictionary } from "../dictionaries";
import AllActors from "@/components/AllActors";

const fetchAllActors = async (lang) => {
  return await fetchData(`/person/popular`, lang);
};

export default async function Actors({ params: { lang } }) {
  const dict = await getDictionary(lang);

  let actorsData;
  try {
    actorsData = await fetchAllActors(lang);
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data.</div>;
  }

  const actors = actorsData.results.map(actor => ({
    id: actor.id,
    title: actor.name,
    imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
    genre: actor.known_for_department,
    additionalInfo: '', 
  }));

  return (
    <>
      <AllActors lang={lang} mediaItems={actors} />
    </>
  );
}
