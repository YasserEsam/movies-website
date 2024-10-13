import React from 'react';

const CustomButton = ({
  icon: Icon,
  text,
  onClick,
  width = 'auto',
  height = 'auto',
  margin = '0',
  padding = '0.5rem 1rem',
  className = '',
}) => {

  return (
    <button
      onClick={onClick}
      style={{
        width,
        height,
        margin,
        padding,
      }}
      className={`flex items-center rounded dark:bg-gray-800  bg-gray-200 dark:text-gray-200 text-gray-800  transition-colors duration-300 ${className}`}
    >
      {Icon && <Icon className="mr-2" />}
      {text} 
    </button>
  );
};

export default CustomButton;
