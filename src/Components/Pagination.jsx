import ReactPaginate from "react-paginate";
import React from 'react'

function Pagination({changeCpage,nPage}) {
    return (
        <div>
              
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
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
    )
}

export default Pagination



  
