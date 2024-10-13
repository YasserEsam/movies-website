import React from 'react';

const Card = ({ title, imageUrl, genre, type, additionalInfo }) => {
  return (
    <div className="relative group rounded-3xl bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer">
      <img className="rounded-2xl object-cover w-full h-60" src={imageUrl} alt={`${title} image`} />
      <div className="absolute bottom-3 left-0 mx-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 flex items-center justify-between w-10/12">
        <div>
          <h6 className="font-semibold text-base leading-7 text-gray-900 dark:text-white">{title}</h6>
          <p className="text-xs leading-5 text-gray-400">{genre}</p>
        </div>
        {additionalInfo && <p className="text-xs leading-5 text-gray-400">{additionalInfo}</p>}
      </div>
    </div>
  );
};

export default Card;
