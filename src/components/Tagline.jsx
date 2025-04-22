import Link from 'next/link';
import React from 'react';

const Tagline = ({ text, link, lang = 'en', className = '' }) => {
  const isRTL = lang === 'ar';
  
  return (
    <Link
      href={link}
      className={`group inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {isRTL ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 mr-1 group-hover:translate-x-[-2px] transition-transform"
          >
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {text}
        </>
      ) : (
        <>
          {text}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 ml-1 group-hover:translate-x-[2px] transition-transform"
          >
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </>
      )}
    </Link>
  );
};

export default Tagline;