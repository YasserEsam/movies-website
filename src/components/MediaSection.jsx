import React from 'react';
import Card from './Card';

const MediaSection = ({ title, mediaItems }) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-xl:text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {mediaItems.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              imageUrl={item.imageUrl}
              genre={item.genre}
              additionalInfo={item.additionalInfo}
              releaseDate={item.release_date}  // Example of additional data
              rating={item.vote_average}        // Example of additional data
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
