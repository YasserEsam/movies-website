// components/Pagination.js
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`min-w-[40px] px-4 py-2 mx-1 text-sm font-medium rounded-full transition-all duration-300 shadow-sm border ${
            i === currentPage
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
