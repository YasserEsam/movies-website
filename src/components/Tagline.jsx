import React from 'react';

const Tagline = ({ text, link, buttonLabel }) => {
  return (
    <div className="border border-indigo-600 p-1 w-60 mx-auto rounded-full flex items-center justify-between mb-4">
      <span className="font-inter text-xs font-medium text-gray-900 ml-3">
        {text}
      </span>
      <a
        href={link}
        className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
      >
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
};

export default Tagline;
