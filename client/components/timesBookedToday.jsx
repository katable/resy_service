import React from 'react';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

const TimesBookedToday = ({ timesBookedToday }) => {
  return timesBookedToday
    && (
      <div id={styles.timesBookedOuterContainer}>
        <div id={styles.timesBookedInnerContainer}>
          {svg.trending}
          <div className={`${styles.timesBookedText} test-timesBooked-text`}>{`Booked ${timesBookedToday} times today`}</div>
        </div>
      </div>
    );
};

export default TimesBookedToday;
