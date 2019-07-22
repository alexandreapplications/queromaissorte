import React from "react";
import PropTypes from "prop-types";

function Paginator(props) {
  var recordCount = props.recordCount;
  var pageSize = props.pageSize;
  var pageCount = recordCount / pageSize;
  var pages = [];
  for (var i = 0; i < pageCount; i++) pages.push(i);
  return (
    <>
      {props.currentPage}
      {pages.map(page => (
        <button type="button" onClick={() => props.setPage(page)} key={page}>
          {page}
        </button>
      ))}
    </>
  );
}

Paginator.propTypes = {
  recordCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Paginator;
