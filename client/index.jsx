import React from 'react';
import ReactDOM from 'react-dom';
import PartySize from './components/partySize';
import Date from './components/date';
import Time from './components/time';
import Availability from './components/availability';
import TimesBookedToday from './components/timesBookedToday';
import TimeslotsLeft from './components/timeslotsLeft';
import SaveThisRestaurant from './components/saveThisRestaurant';

const App = () => (
  <div>
    <div className="main">
      <div className="header">Make a reservation</div>
      <div className="body">
        <PartySize />
        <Date />
        <Time />
        <Availability />
        <TimesBookedToday />
        <TimeslotsLeft />
      </div>
    </div>
    <SaveThisRestaurant />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
