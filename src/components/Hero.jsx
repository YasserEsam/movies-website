import { getDictionary } from '@/app/[lang]/dictionaries';
import CustomButton from '@/components/CustomButton';
import { BiRightArrow } from 'react-icons/bi';

export default async function Hero({ lang }) {
  const dict = await getDictionary(lang);

  return (
    <section className="relative overflow-hidden pt-32 pb-28 lg:pt-36 lg:pb-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-400 opacity-10 dark:opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-400 opacity-10 dark:opacity-5 blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="flex justify-center">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300 animate-pulse">
            {dict.Hero.tagline}
          </span>
        </div>
        
        <h1 className="mx-auto text-center lg:leading-snug max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          {dict.Hero.description.split(' ').map((word, i) => (
            <span 
              key={i} 
              className="inline-block transition-transform duration-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        
        <p className="mx-auto mt-8 text-center max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          {dict.Hero.details}
        </p>
        
        
      </div>
      
      
    </section>
  );
}