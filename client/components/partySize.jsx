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
      <div className={`${styles.inputFieldSelected} test-partySize-text`}>For {partySize}</div>
      {svg.downCaret}
      <select value={partySize} onChange={handleChangeParty} className={`${styles.inputFieldDropdown} test-partySize-select`}>
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
