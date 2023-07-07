import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

// import React from 'react'

function Pagination({ changeCpage, nPage, currentPage }) {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        initialPage={currentPage}
        onPageChange={changeCpage}
        pageCount={nPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="paginationBttns"
        previousClassName="previousBttns"
        nextLinkClassName="nextBttns"
        disabledClassName="paginationDisabled"
        activeClassName="paginationActive"
      />
    </div>
  );
}
Pagination.propTypes = {
  changeCpage: PropTypes.func.isRequired,
  nPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
