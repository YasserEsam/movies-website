import React, { useEffect, useState } from 'react';

const Toast = ({ type, message, duration = 4000, position = 'bottom-right' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-5 right-5',
    'top-right': 'top-5 right-5',
  };

  const toastStyles = {
    success: 'border-green-500 text-green-500',
    error: 'border-red-500 text-red-500',
  };

  return (
    <div className={`fixed z-50 flex items-center bg-white px-6 py-4 border-t-2 rounded-b shadow-sm ${toastStyles[type]} ${positionClasses[position]}`}>
      {type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <div className="ml-3">
        <div className="font-bold text-left">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
