import React from 'react';
import PropTypes from 'prop-types';
import Problem from './problem';
import { numStrToPrimitive, Hr24ToAMPM } from './helper';

const Availability = ({ stage, handleFindTable, availableSlots, dateTime, restaurantName }) => {
  if (stage === 'findTable') return <button type="button" onClick={handleFindTable} style={{ backgroundColor: '#da3743', color: '#fff' }}>Find a Table</button>;

  // Don't know what the best way to handle long strings is... if I use string concatenation,
  // then function calls slow things down.  if I use ES6 template literals, then what about
  // indentation?  Removing indentation also has performance impact.
  if (stage === 'partyTooLarge') return <Problem message={`Unfortunately, your party is too large to make an online reservation at ${restaurantName}. We recommend contacting the restaurant directly.`} />;

  if (stage === 'tooFarInAdvance') return <Problem message={`Unfortunately, ${restaurantName} doesn’t take online reservations that far in advance. Have another time in mind?`} />;

  if (stage === 'notAvailable') return <Problem message={`At the moment, there’s no online availability within 2.5 hours of ${time}. Have another time in mind?`} />;

  // stage === 'success'
  const selectedDateTime = numStrToPrimitive(dateTime).toISOString();

  const earlierDateTime = availableSlots.filter(x => x < selectedDateTime).slice(-2);
  const matchedDateTime = availableSlots.filter(x => x === selectedDateTime);
  const laterDateTime = availableSlots.filter(x => x > selectedDateTime).slice(0, 2);
  const displayDateTime = [...earlierDateTime, ...matchedDateTime, ...laterDateTime];

  const displayTime = displayDateTime.map((dt) => {
    const timeHr24 = dt.slice(11, 13) + dt.slice(14, 16);
    return Hr24ToAMPM[timeHr24];
  });

  // remove right margin for the last element
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {displayTime.map(time => <div key={time} style={{ marginRight: '.5rem', marginBottom: '.5rem', backgroundColor: '#da3743', color: '#fff' }}>{time}</div>)}
    </div>
  );
};

Availability.propTypes = {
  stage: PropTypes.string.isRequired,
  handleFindTable: PropTypes.func.isRequired,
  availableSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateTime: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default Availability;
