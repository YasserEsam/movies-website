import { getDictionary } from '@/app/[lang]/dictionaries';
import CustomButton from '@/components/CustomButton';
import Description from '@/components/landingPage/Description';
import Title from '@/components/landingPage/Title';
import Tagline from '@/components/Tagline';
import { BiRightArrow } from 'react-icons/bi';

export default async function Hero({ lang }) {
  const dict = await getDictionary(lang);

  return (
    <section className="pt-24 pb-24 lg:pt-20 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="flex justify-center">
          <Tagline text={dict.Hero.tagline} link="/movies" />
        </div>
        <Title text={dict.Hero.description} />
        <Description text={dict.Hero.details} />
        
      </div>
    </section>
  );
}
