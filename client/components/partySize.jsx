import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

const maxPartySize = 20;

const PartySize = ({ partySize, handleChangeParty }) => (
  <div className={styles.inputContainer}>
    <div className={styles.inputLabel}>Party Size</div>
    <div className={styles.inputFieldContainer}>
      <div className={styles.inputFieldSelected}>For {partySize}</div>
      {svg.downCaret}
      <select value={partySize} onChange={handleChangeParty} className={styles.inputFieldDropdown}>
        {_.range(1, maxPartySize + 1).map(i => <option key={`party${i}`}>{i}</option>)}
      </select>
    </div>
  </div>
);

PartySize.propTypes = {
  partySize: PropTypes.string.isRequired,
  handleChangeParty: PropTypes.func.isRequired,
};

export default PartySize;


/*
  <div>
    <div>Party Size</div>
    <div style={{ position: 'absolute' }}>
      <div style={{ zIndex: -1 }}>For {partySize}</div>
      <select value={partySize} onChange={handleChangeParty} style={{ width: '500px' }}>
        {_.range(1, maxPartySize + 1).map(i => <option key={`party${i}`}>{i}</option>)}
      </select>
    </div>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24" style={{ zIndex: -1, position: 'absolute', width: '0.5rem', height: '100%', top: 0, right: '9px'}}>
        <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}}>
        </path>
      </svg>
*/