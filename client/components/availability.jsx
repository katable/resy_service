import React from 'react';
import PropTypes from 'prop-types';
import Problem from './problem';
import { numStrToPrimitive, Hr24ToAMPM } from './helper';
import styles from '../styles/styles.css';

const Availability = ({ stage, handleFindTable, availableSlots, dateTime, restaurantName }) => {
  if (stage === 'findTable') return (
    <div style={{ margin: '1rem auto 0' }}>
      <button type="button" onClick={handleFindTable} className={styles.bigButton}>Find a Table</button>
    </div>
  );

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

  const displayTimeExceptLast = displayTime.slice(0, displayTime.length - 1);
  const displayTimeLast = displayTime.slice(-1)[0];

  // remove right margin for the last element
  return (
    <div style={{ margin: '1rem auto 0' }}>
      <div style={{ margin: '0 0 .5rem' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Select a time:</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {displayTimeExceptLast.map(time => <button key={time} className={styles.timeButton}>{time}</button>)}
        {
          <button key={displayTimeLast} className={styles.lastTimeButton}>{displayTimeLast}</button>
        }
      </div>
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
