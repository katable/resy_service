import React from 'react';
import PropTypes from 'prop-types';
import { AMPMToHr24, numStrToTimeAMPM } from './helper';

const timeslots = Object.keys(AMPMToHr24);

const Time = ({ dateTime, handleChangeTime }) => (
  <div style={{ flex: '1 50%', textAlign: 'left' }}>
    <div style={{ paddingBottom: '.25rem'}}>Time</div>
    <div style={{ height: '35px', position: 'relative', borderBottom: '1px solid #d8d9db' }}>
      <div style={{ position: 'absolute', height: 'calc(100% - 2px', paddingTop: '2px' }}>{numStrToTimeAMPM(dateTime)}</div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24" style={{ position: 'absolute', top: 0, right: '9px', height: '100%', width: '0.5rem' }}>
        <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}}>
        </path>
      </svg>
      <select value={numStrToTimeAMPM(dateTime)} onChange={handleChangeTime} style={{ height: '35px', width: '100%', backgroundColor: 'transparent', color: 'transparent', WebkitAppearance: 'none', border: 'none' }}>
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
