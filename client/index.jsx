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
      partySize: '3', // user-supplied
      stage: 'findTable',
      availableSlots: [],
      timesBookedToday: null,
    };

    // the user will have supplied some values from the home page before the restaurant page
    this.restaurantId = 1;
    this.restaurantName = 'Boulevard';
    this.date = new Date('2019-10-2');
    this.time = '7:00 PM';

    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleFindTable = this.handleFindTable.bind(this);
  }

  componentDidMount() {
    // fetch number of times booked today
    fetch(`/reservations/timesBookedToday/${this.restaurantId}`)
      .then(res => res.json())
      .then((response) => {
        const num = JSON.stringify(response);
        if (num !== '-1') this.setState({ timesBookedToday: JSON.stringify(response) });
      });
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
    fetch(`/reservations/inventory?restaurant_id=${this.restaurantId}&date=${this.date}&time=${this.time}`)
      .then((res) => {
        this.setState({
          availableSlots: res.availableSlots,
          stage: res.stage,
        });
      });
  }

  render() {
    const { partySize, stage, availableSlots, timesBookedToday } = this.state;

    return (
      <div>
        <div className="main">
          <div className="header">Make a reservation</div>
          <div className="body">
            <div className="inputs">
              <PartySize partySize={partySize} handleChangeParty={this.handleChangeParty} />
              <Calendar date={this.date} handleChangeDate={this.handleChangeDate} />
              <Time time={this.time} handleChangeTime={this.handleChangeTime} />
            </div>
            <Availability stage={stage} handleFindTable={this.handleFindTable} availableSlots={availableSlots} time={this.time} restaurantName={this.restaurantName} />
            <TimesBookedToday timesBookedToday={timesBookedToday} />
            <TimeslotsLeft timeslotsLeft={availableSlots.length} />
          </div>
        </div>
        <SaveThisRestaurant />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
