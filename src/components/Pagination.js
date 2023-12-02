import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-row-reverse justify-between py-4">
      
      <div className="flex  space-x-2">
        <button
          className={`first-page border border-gray-300 hover:bg-slate-300 font-bold py-2 px-4 rounded ${
            isFirstPage ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
        >
          First
        </button>
        <button
          className={`previous-page border border-gray-300 hover:bg-slate-300 font-bold py-2 px-4 rounded ${
            isFirstPage ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`border border-gray-300 hover:bg-slate-300 font-bold py-2 px-4 rounded ${
              page === currentPage ? 'bg-slate-300' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className={`next-page border border-gray-300 hover:bg-slate-300 font-bold py-2 px-4 rounded ${
            isLastPage ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
        <button
          className={`last-page border border-gray-300 hover:bg-slate-300 font-bold py-2 px-4 rounded ${
            isLastPage ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
