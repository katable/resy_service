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
      partySize: '3',
      date: new Date(),
      time: '7:00 PM',
      stage: 'findTable',
      availableSlots: null,
      restaurantName: 'Boulevard',
    };

    this.timesBookedToday = null;

    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleFindTable = this.handleFindTable.bind(this);
  }

  componentDidMount() {
    // fetch number of times booked today
  }

  handleChangeParty(e) {
    this.setState({
      partySize: e.target.value,
      stage: 'findTable',
    });
  }

  handleChangeDate(e) {
    this.setState({
      date: e.target.value,
      stage: 'findTable',
    });
  }

  handleChangeTime(e) {
    this.setState({
      time: e.target.value,
      stage: 'findTable',
    });
  }

  handleFindTable() {
    // fetch availability based on specified party size, date, time
    //   if party too large, set availableSlots to [], stage to 'partyTooLarge'
    //   if too far in advance, set availableSlots to [], stage to 'tooFarInAdvance'
    // if available: set availableSlots, stage to 'selectTime'
    // else set availableSlots to [], stage to 'notAvailable'
  }

  render() {
    const { partySize, date, time, stage, availableSlots, restaurantName } = this.state;

    return (
      <div>
        <div className="main">
          <div className="header">Make a reservation</div>
          <div className="body">
            <PartySize partySize={partySize} handleChangeParty={this.handleChangeParty} />
            <Calendar date={date} handleChangeDate={this.handleChangeDate} />
            <Time time={time} handleChangeTime={this.handleChangeTime} />
            <Availability stage={stage} handleFindTable={this.handleFindTable} availableSlots={availableSlots} time={time} restaurantName={restaurantName} />
            <TimesBookedToday timesBookedToday={this.timesBookedToday} />
            <TimeslotsLeft timeslotsLeft={availableSlots.length} />
          </div>
        </div>
        <SaveThisRestaurant />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
