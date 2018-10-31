import React from 'react';
import PropTypes from 'prop-types';
import { AMPMToHr24, numStrToTimeAMPM } from './helper';

const timeslots = Object.keys(AMPMToHr24);

const Time = ({ dateTime, handleChangeTime }) => (
  <div>
    <div>Time</div>
    <select value={numStrToTimeAMPM(dateTime)} onChange={handleChangeTime}>
      {timeslots.map(ts => <option key={ts}>{ts}</option>)}
    </select>
  </div>
);

Time.propTypes = {
  dateTime: PropTypes.string.isRequired,
  handleChangeTime: PropTypes.func.isRequired,
};

export default Time;
