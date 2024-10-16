import { fetchData } from "@/utils/api";
import { getDictionary } from "../dictionaries";
import AllActors from "@/components/AllActors";


export const metadata = {
  title: 'Actors - Movies App',
  description: 'Actors page',
};

export default async function Actors({ params: { lang } }) {
  const dict = await getDictionary(lang);

 

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <AllActors lang={lang} />
    </div>
  );
}
