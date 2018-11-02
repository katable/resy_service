import React from 'react';
import PropTypes from 'prop-types';
import { AMPMToHr24, numStrToTimeAMPM } from './helper';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

const timeslots = Object.keys(AMPMToHr24);

const Time = ({ dateTime, handleChangeTime }) => (
  <div className={styles.inputTimeContainer}>
    <div className={styles.inputLabel}>Time</div>
    <div className={styles.inputFieldContainer}>
      <div className={styles.inputFieldSelected}>{numStrToTimeAMPM(dateTime)}</div>
      {svg.downCaret}
      <select value={numStrToTimeAMPM(dateTime)} onChange={handleChangeTime} className={styles.inputFieldDropdown}>
        {timeslots.map(ts => <option key={ts}>{ts}</option>)}
      </select>
    </div>
  </div>
);

Time.propTypes = {
  dateTime: PropTypes.string.isRequired,
  handleChangeTime: PropTypes.func.isRequired,
};

export default Time;
