import React from 'react';
import PropTypes from 'prop-types';
import Problem from './problem';
import { Hr24ToAMPM, dateTimeToTime } from './helper';
import styles from '../styles/styles.css';

const Availability = ({ stage, handleFindTable, displayedSlots, dateTime, restaurantName }) => {
  if (stage === 'findTable') {
    return (
      <div id={styles.bigButtonContainer}>
        <button type="button" onClick={handleFindTable} className={styles.bigButton}>Find a Table</button>
      </div>
    );
  }

  if (stage !== 'success') {
    let errorMessage = '';

    if (stage === 'partyTooLarge') {
      errorMessage = 'Unfortunately, your party is too large to make an online reservation at '
        + `${restaurantName}. We recommend contacting the restaurant directly.`;
    } else if (stage === 'tooFarInAdvance') {
      errorMessage = `Unfortunately, ${restaurantName} doesn’t take online reservations that far`
        + ' in advance. Have another time in mind?';
    } else if (stage === 'notAvailable') {
      const timeAMPM = Hr24ToAMPM[dateTimeToTime(dateTime)];
      errorMessage = `At the moment, there’s no online availability within 2.5 hours of ${timeAMPM}.`
        + ' Have another time in mind?';
    }

    return <Problem message={errorMessage} />;
  }

  const displayedSlotsExceptLast = displayedSlots.slice(0, displayedSlots.length - 1);
  const displayedSlotLast = displayedSlots.slice(-1)[0];

  return (
    <div id={styles.selectTimeOuterContainer}>
      <div id={styles.selectTimeLabelContainer}>
        <div id={styles.selectTimeLabel}>Select a time:</div>
      </div>
      <div className={styles.selectTimeSlotsContainer}>
        {displayedSlotsExceptLast.map(ts => <button key={ts} type="button" className={styles.timeButton}>{ts}</button>)}
        <button key={displayedSlotLast} type="button" className={styles.lastTimeButton}>{displayedSlotLast}</button>
      </div>
    </div>
  );
};

Availability.propTypes = {
  stage: PropTypes.string.isRequired,
  handleFindTable: PropTypes.func.isRequired,
  displayedSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateTime: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default Availability;
