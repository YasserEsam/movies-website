import { getDictionary } from '@/app/[lang]/dictionaries';
import CustomButton from '@/components/CustomButton';
import Description from '@/components/landingPage/Description';
import Title from '@/components/landingPage/Title';
import Tagline from '@/components/Tagline';
import { fetchData } from '@/utils/api';
import { BiRightArrow } from 'react-icons/bi';

export default async function Hero({ lang }) { // Accept lang prop directly
  const dict = await getDictionary(lang);

  return (
    <section className="pt-16 pb-16 lg:pt-20 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <Tagline text={dict.Hero.tagline} link="/movies" />
        <Title text={dict.Hero.description} />
        <Description text={dict.Hero.details} />
        <div className="flex justify-center items-center">
          <CustomButton
            text={dict.Hero.getStarted}
            icon={BiRightArrow}
            padding={'0.8rem 2.5rem'}
          />
        </div>
      </div>
    </section>
  );
}
