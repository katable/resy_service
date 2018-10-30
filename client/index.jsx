import React from 'react';
import ReactDOM from 'react-dom';
import PartySize from './components/partySize';
import Calendar from './components/calendar';
import Time from './components/time';
import Availability from './components/availability';
import TimesBookedToday from './components/timesBookedToday';
import TimeslotsLeft from './components/timeslotsLeft';
import SaveThisRestaurant from './components/saveThisRestaurant';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // the user will have supplied some values from the home page before the restaurant page
      partySize: 2,
      date: new Date(),
      time: '1900',
    };
  }

  handleChange() {

  }
  
  render() {
    return (
      <div>
        <div className="main">
          <div className="header">Make a reservation</div>
          <div className="body">
            <PartySize partySize={this.state.partySize} handleChange={this.handleChange.bind(this)}/>
            <Calendar />
            <Time />
            <Availability />
            <TimesBookedToday />
            <TimeslotsLeft />
          </div>
        </div>
        <SaveThisRestaurant />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
