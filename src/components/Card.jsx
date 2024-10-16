"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const Card = ({ title, imageUrl, genre, additionalInfo, type }) => {
  // Default image URL
  const defaultImageUrl = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'; // Change this URL to your default image
  
  // State to manage the final image URL
  const [finalImageUrl, setFinalImageUrl] = useState(imageUrl || defaultImageUrl);

  // Handle image load error
  const handleError = () => {
    setFinalImageUrl(defaultImageUrl);
  };

  return (
    <Link href={type}>
      <div className="relative h-96 w-auto max-w-96 min-w-64 mx-auto group rounded-3xl bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer">
        <img
          className="rounded-2xl object-cover w-full"
          src={finalImageUrl}
          alt={`${title} image`}
          onError={handleError} // Set onError handler
        />
        <div className="absolute bottom-3 mx-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 flex items-center justify-between w-10/12">
          <div>
            <h6 className="font-semibold text-base leading-7 text-gray-900 dark:text-white">{title}</h6>
            <p className="text-xs leading-5 text-gray-400">{genre}</p>
          </div>
          {additionalInfo && <p className="text-xs leading-5 text-gray-400">{additionalInfo}</p>}
        </div>
      </div>
    </Link>
  );
};

export default Card;
