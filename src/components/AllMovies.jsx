// src/components/AllMovies.jsx

import React from 'react';
import MediaSection from './MediaSection';

const AllMovies = ({ mediaItems, lang }) => {
  return (
    <MediaSection
      title={lang === 'ar' ? 'جميع الأفلام' : 'All Movies'}
      mediaItems={mediaItems}
      lang={lang}
      isTaged={false}
    />
  );
};

export default AllMovies;
