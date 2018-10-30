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
      partySize: '2',
      date: new Date(),
      time: '12:00 AM',
    };

    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }

  handleChangeParty(e) {
    this.setState({ partySize: e.target.value });
  }

  handleChangeTime(e) {
    this.setState({ time: e.target.value });
  }

  render() {
    const { partySize, date } = this.state;

    return (
      <div>
        <div className="main">
          <div className="header">Make a reservation</div>
          <div className="body">
            <PartySize partySize={partySize} handleChangeParty={this.handleChangeParty} />
            <Calendar date={date} />
            <Time handleChangeTime={this.handleChangeTime} />
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
