import React from 'react';
import PropTypes from 'prop-types';
import {
  numStrToPrimitive, dayOfWeekAbbr, addOneMonthToFOM, minusOneMonthFromFOM,
  showWeekdayMonthSlashDay, showFullMonthYear, showMonthSlashDay,
  toFirstOfMonth, getDatesToShow,
} from './helper';

const BasicDiv = val => (<div key={val}>{val}</div>);

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
      <div style={{ flex: '1 50%' }}>
        <div>Date</div>
        <div role="button" onClick={this.toggleCalendar} style={{ height: '35px', position: 'relative' }}>
          <div style={{ position: 'absolute' }}>{showWeekdayMonthSlashDay(selectedDate)}</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24" style={{ position: 'absolute', top: 0, right: '9px', height: '100%', width: '0.5rem' }}>
            <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}}>
            </path>
          </svg>
        </div>
        {
          showCalendar
          && (
            <div>
              <div>
                <div role="button" onClick={this.handlePrevMonth}>prev</div>
                <div>{showFullMonthYear(calFirstOfMonth)}</div>
                <div role="button" onClick={this.handleNextMonth}>next</div>
              </div>
              <div>{dayOfWeekAbbr.map(dayOfWeek => BasicDiv(dayOfWeek))}</div>
              <div>
                {datesToShow.map(date => BasicDiv(showMonthSlashDay(date)))}
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
