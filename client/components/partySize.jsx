import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const maxPartySize = 20;

const PartySize = ({ partySize, handleChangeParty }) => (
  <div style={{ flex: '1 50%', textAlign: 'left' }}>
    <div style={{ paddingBottom: '.25rem'}}>Party Size</div>
    <div style={{ height: '35px', position: 'relative', borderBottom: '1px solid #d8d9db' }}>
      <div style={{ position: 'absolute', height: 'calc(100% - 2px', paddingTop: '2px' }}>For {partySize}</div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24" style={{ position: 'absolute', top: 0, right: '9px', height: '100%', width: '0.5rem' }}>
        <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}}>
        </path>
      </svg>
      <select value={partySize} onChange={handleChangeParty} style={{ height: '35px', width: '100%', backgroundColor: 'transparent', color: 'transparent', WebkitAppearance: 'none', border: 'none' }}>
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