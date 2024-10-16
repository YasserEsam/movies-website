import { getDictionary } from "../dictionaries";
import AllMovies from "@/components/AllMovies";

export const metadata = {
  title: 'Movies - Movies App',
  description: 'Movies page',
}



export default async function Movies({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <div className="bg-white dark:bg-gray-800">
      <AllMovies lang={lang} />
    </div>
  );
}
