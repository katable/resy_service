import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const maxPartySize = 20;

const PartySize = ({ partySize, handleChangeParty }) => (
  <div>
    <div>Party Size</div>
    <div>For {partySize}</div>
    <select onChange={handleChangeParty}>
      {_.range(1, maxPartySize + 1).map(i => <option key={`party${i}`}>{i}</option>)}
    </select>
  </div>
);

PartySize.propTypes = {
  partySize: PropTypes.string.isRequired,
  handleChangeParty: PropTypes.func.isRequired,
};

export default PartySize;
