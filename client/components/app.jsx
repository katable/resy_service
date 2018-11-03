import React from 'react';
import PartySize from './partySize';
import Calendar from './calendar';
import Time from './time';
import Availability from './availability';
import TimesBookedToday from './timesBookedToday';
import TimeslotsLeft from './timeslotsLeft';
import SaveThisRestaurant from './saveThisRestaurant';
import { removeHyphen, mapTo24Hr, numStrToPrimitive, Hr24ToAMPM, strippedDateTime } from './helper';
import styles from '../styles/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '2020-03-27 9:00 PM',
      partySize: '2', // user-supplied
      stage: 'findTable',
      displayedSlots: [],
      timesBookedToday: null,
    };

    // the user will have supplied some values from the home page before the restaurant page
    this.restId = 1;
    this.restaurantName = 'Alinea';

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
    const { dateTime } = this.state;
    const time = dateTime.slice(dateTime.indexOf(' ') + 1);

    this.setState({
      dateTime: `${e.target.id.split(' ')[0]} ${time}`,
      stage: 'findTable',
    });
  }

  handleChangeTime(e) {
    const { dateTime } = this.state;
    const date = dateTime.slice(0, dateTime.indexOf(' '));

    this.setState({
      time: `${date} ${e.target.value}`,
      stage: 'findTable',
    });
  }

  handleFindTable() {
    let { dateTime, partySize } = this.state;
    dateTime = strippedDateTime(dateTime);

    fetch(`/reservations/inventory?restaurantId=${this.restId}&dateTime=${dateTime}&party=${partySize}`)
      .then(res => res.json())
      .then(({ stage, availableSlots }) => {
        const selectedDateTime = numStrToPrimitive(dateTime).toISOString();

        const earlierDateTime = availableSlots.filter(x => x < selectedDateTime).slice(-2);
        const matchedDateTime = availableSlots.filter(x => x === selectedDateTime);
        const laterDateTime = availableSlots.filter(x => x > selectedDateTime).slice(0, 2);
        const displayDateTime = [...earlierDateTime, ...matchedDateTime, ...laterDateTime];

        const displayedSlots = displayDateTime.map((dt) => {
          const timeHr24 = dt.slice(11, 13) + dt.slice(14, 16);
          return Hr24ToAMPM[timeHr24];
        });

        this.setState({ stage, displayedSlots });
      });
  }

  render() {
    let { dateTime, partySize, stage, displayedSlots, timesBookedToday } = this.state;
    const time = dateTime.slice(dateTime.indexOf(' ') + 1);
    dateTime = strippedDateTime(dateTime);

    return (
      <div id={styles.mainContainer}>
        <div id={styles.resyContainer}>
          <div id={styles.outerHeaderContainer}>
            <div id={styles.innerHeaderContainer}>
              <div id={styles.header}>Make a reservation</div>
            </div>
          </div>
          <div id={styles.bodyContainer}>
            <div className={styles.allInputsContainer}>
              <PartySize partySize={partySize} handleChangeParty={this.handleChangeParty} />
              <div id={styles.dateTimeInputsContainer}>
                <Calendar dateTime={dateTime} handleChangeDate={this.handleChangeDate} />
                <Time dateTime={dateTime} handleChangeTime={this.handleChangeTime} />
              </div>
            </div>
            <Availability
              stage={stage}
              handleFindTable={this.handleFindTable}
              displayedSlots={displayedSlots}
              time={time}
              restaurantName={this.restaurantName}
            />
            <TimesBookedToday timesBookedToday={timesBookedToday} />
            <TimeslotsLeft timeslotsLeft={displayedSlots.length} />
          </div>
        </div>
        <SaveThisRestaurant />
      </div>
    );
  }
}

export default App;
