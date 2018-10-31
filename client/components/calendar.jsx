import React from 'react';
import { numStrToPrimitive, dayOfWeek, month } from './helper';
import PropTypes from 'prop-types';

// const Calendar = ({ dateTime, handleChangeDate }) => {
//   let dtPrimitive = numStrToPrimitive(dateTime);
// };

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { dateTime } = props;

    this.state = {
      showCalendar: false,
      selectedDate: numStrToPrimitive(dateTime),
      calendarDate: new Date(numStrToPrimitive(dateTime).setUTCDate(1)),
    };

    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  toggleCalendar() {
    const { showCalendar } = this.state;

    this.setState({
      showCalendar: !showCalendar,
    });
  }

  // this.props.handleChangeDate

  render() {
    const { showCalendar, selectedDate, calendarDate } = this.state;
    const calMonthYear = `${month[calendarDate.getUTCMonth()]} ${calendarDate.getUTCFullYear()}`;

    return (
      <div>
        <div>Date</div>
        <button type="button" onClick={this.toggleCalendar}>
          {`${dayOfWeek[selectedDate.getUTCDay()]}, ${selectedDate.getUTCMonth() + 1}/${selectedDate.getUTCDate()}`}
        </button>
        {
          showCalendar
          && (
            <div>
              <div>{'prev'} {calMonthYear} {'next'}</div>
            </div>
          )
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  dateTime: PropTypes.string.isRequired,
};

export default Calendar;
