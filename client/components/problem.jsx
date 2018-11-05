import React from 'react';
import PropTypes from 'prop-types';
import svg from '../styles/svg';

const Problem = ({ message }) => (
  <div style={{margin: '1rem auto 0'}}>
    <div style={{padding: '.5rem', backgroundColor: '#f1f2f4', display: 'flex'}}>
      <div>{svg.negative}</div>
      <div style={{textAlign: 'left'}}>{message}</div>
    </div>
  </div>
);

Problem.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Problem;
