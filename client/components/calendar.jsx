import React from 'react';
import PropTypes from 'prop-types';
import {
  numStrToPrimitive, dayOfWeekAbbr, addOneMonthToFOM, minusOneMonthFromFOM,
  showWeekdayMonthSlashDay, showFullMonthYear, showMonthSlashDay,
  toFirstOfMonth, getDatesToShow,
} from './helper';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { dateTime } = props;

    this.state = {
      showCalendar: false,
      selectedDate: numStrToPrimitive(dateTime),
      calFirstOfMonth: toFirstOfMonth(numStrToPrimitive(dateTime)),
    };

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
  }

  toggleCalendar() {
    const { showCalendar } = this.state;

    this.setState({
      showCalendar: !showCalendar,
    });
  }

  handlePrevMonth() {
    const { calFirstOfMonth } = this.state;

    this.setState({
      calFirstOfMonth: minusOneMonthFromFOM(calFirstOfMonth),
    });
  }

  handleNextMonth() {
    const { calFirstOfMonth } = this.state;

    this.setState({
      calFirstOfMonth: addOneMonthToFOM(calFirstOfMonth),
    });
  }

  // this.props.handleChangeDate

  render() {
    const { showCalendar, selectedDate, calFirstOfMonth } = this.state;
    const datesToShow = getDatesToShow(calFirstOfMonth);

    return (
      <div>
        <div>Date</div>
        <button type="button" onClick={this.toggleCalendar}>
          {showWeekdayMonthSlashDay(selectedDate)}
        </button>
        {
          showCalendar
          && (
            <div>
              <div>
                <div role="button" onClick={this.handlePrevMonth}>prev</div>
                <div>{showFullMonthYear(calFirstOfMonth)}</div>
                <div role="button" onClick={this.handleNextMonth}>next</div>
              </div>
              <div>{dayOfWeekAbbr.map(day => <div key={day}>{day}</div>)}</div>
              <div>
              {
                datesToShow.map(date => <div key={showMonthSlashDay(date)}>{showMonthSlashDay(date)}</div>)
              }
              </div>
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
