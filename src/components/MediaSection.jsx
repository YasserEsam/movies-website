import React from 'react';
import Card from './Card';
import Tagline from './Tagline';

const MediaSection = ({ title, mediaItems, lang, isTaged = true, type, link }) => {
  const moreOf = lang === 'ar' ? `المزيد من ${title}` : `More ${title}`;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <div className="w-24 mt-3 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto lg:mx-0 rounded-full"></div>
          </div>
          
          {isTaged && (
            <Tagline 
              text={moreOf} 
              link={link}
              className="group flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              iconClassName="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          )}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mediaItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              genre={item.genre}
              additionalInfo={item.additionalInfo}
              releaseDate={item.release_date}
              rating={item.vote_average}
              type={`/${type}/${item.id}`}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;