import React from 'react';
import PropTypes from 'prop-types';
import Problem from './problem';

const Availability = ({ stage, handleFindTable, availableSlots, time, restaurantName }) => {
  if (stage === 'findTable') return <div onClick={handleFindTable}>Find a Table</div>;

  if (stage === 'partyTooLarge') return <Problem message={`Unfortunately, your party is too large to make an online reservation at ${restaurantName}. We recommend contacting the restaurant directly.`} />;

  if (stage === 'tooFarInAdvance') return <Problem message={`Unfortunately, ${restaurantName} doesn’t take online reservations that far in advance. Have another time in mind?`} />;

  if (stage === 'notAvailable') return <Problem message={`At the moment, there’s no online availability within 2.5 hours of ${time}. Have another time in mind?`} />;

  return <div>Available Times</div>;
};

Availability.propTypes = {
  stage: PropTypes.string.isRequired,
  handleFindTable: PropTypes.func.isRequired,
  availableSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default Availability;
