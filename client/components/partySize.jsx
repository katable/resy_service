import React from 'react';
import _ from 'underscore';

const maxPartySize = 20;

const PartySize = () => (
  <div>
    <div>Party Size</div>
    <ul>
      {_.range(1, maxPartySize + 1).map(i => <li>{i}</li>)}
    </ul>
  </div>
);

export default PartySize;
