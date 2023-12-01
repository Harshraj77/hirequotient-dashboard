import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      <button className="first-page" onClick={() => handlePageChange(1)}>First</button>
      <button className="previous-page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
      ))}
      <button className="next-page" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      <button className="last-page" onClick={() => handlePageChange(totalPages)}>Last</button>
    </div>
  );
};

export default Pagination;
