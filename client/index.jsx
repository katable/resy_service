import React from 'react';
import ReactDOM from 'react-dom';
import PartySize from './components/partySize';
import Calendar from './components/calendar';
import Time from './components/time';
import Availability from './components/availability';
import TimesBookedToday from './components/timesBookedToday';
import TimeslotsLeft from './components/timeslotsLeft';
import SaveThisRestaurant from './components/saveThisRestaurant';
import { removeHyphen, mapTo24Hr } from './components/helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partySize: '2', // user-supplied
      stage: 'findTable',
      availableSlots: [],
      timesBookedToday: null,
    };

    // the user will have supplied some values from the home page before the restaurant page
    this.restId = 1;
    this.restaurantName = 'Boulevard';
    const date = '2020-03-27';
    const time = '9:00 PM';
    this.dateTime = removeHyphen(date) + mapTo24Hr(time);

    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleFindTable = this.handleFindTable.bind(this);
  }

  componentDidMount() {
    // fetch number of times booked today
    fetch(`/reservations/timesBookedToday/${this.restId}`)
      .then(res => res.json())
      .then((response) => {
        if (response !== '-1') this.setState({ timesBookedToday: response });
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
    const { partySize } = this.state;

    fetch(`/reservations/inventory?restaurantId=${this.restId}&dateTime=${this.dateTime}&party=${partySize}`)
      .then(res => res.json())
      .then(({ stage, availableSlots }) => {
        this.setState({ stage, availableSlots });
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
              <Calendar dateTime={this.dateTime} handleChangeDate={this.handleChangeDate} />
              <Time dateTime={this.dateTime} handleChangeTime={this.handleChangeTime} />
            </div>
            <Availability stage={stage} handleFindTable={this.handleFindTable} availableSlots={availableSlots} dateTime={this.dateTime} restaurantName={this.restaurantName} />
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
