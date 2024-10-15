import { getDictionary } from "../dictionaries";
import AllTv from "@/components/AllTv";



export default async function TvShows({ params: { lang } }) {
  const dict = await getDictionary(lang);


  return (
    <div className="bg-white dark:bg-gray-800">
      <AllTv lang={lang}/>
    </div>
  );
}
