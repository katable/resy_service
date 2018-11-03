import React from 'react';
import PropTypes from 'prop-types';

const Problem = ({ message }) => (
  <div>
    {/* <div>
      <svg></svg>
    </div> */}
    <div>! {message}</div>
  </div>
);


Problem.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Problem;
