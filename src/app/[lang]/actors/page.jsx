import { fetchData } from "@/utils/api";
import { getDictionary } from "../dictionaries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the AllActors component
const AllActors = dynamic(() => import("@/components/AllActors"), { ssr: false });
const Spinner = dynamic(() => import("@/components/spinner"), { ssr: false });

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
    title: actor.name,
    imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
    genre: actor.known_for_department,
    additionalInfo: '', 
  }));

  return (
    <Suspense fallback={<Spinner />}>
      <AllActors lang={lang} mediaItems={actors} />
    </Suspense>
  );
}
