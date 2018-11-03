import React from 'react';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

const TimeSlotsLeft = ({ timeslotsLeft }) => {
  return (timeslotsLeft < 5 && timeslotsLeft > 0)
  && (
    <div id={styles.timeslotsLeftContainer}>
      {svg.scarcity}
      <div className={styles.timeslotsLeftText}>{`You're in luck! We still have ${timeslotsLeft} timeslots left`}</div>
    </div>
  );
};

export default TimeSlotsLeft;
