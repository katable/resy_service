import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {
  numStrToPrimitive, dayOfWeekAbbr, addOneMonthToFOM, minusOneMonthFromFOM,
  showWeekdayMonthSlashDay, showFullMonthYear,
  toFirstOfMonth, getDatesToShow,
} from './helper';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

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
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Date</div>
        <div role="button" onClick={this.toggleCalendar} className={styles.inputFieldContainer}>
          <div className={styles.inputFieldSelected}>{showWeekdayMonthSlashDay(selectedDate)}</div>
          {svg.downCaret}
        </div>
        {
          showCalendar
          && (
            <div>
              <div onClick={this.toggleCalendar} id={styles.fullScreenBlankCanvas}></div>
              <div id={styles.calendarOuterContainer}>
                <div id={styles.calendarInnerContainer}>
                  <div id={styles.calendarCaption}>
                    <div>
                      <div role="button" onClick={this.handlePrevMonth} className={styles.roundButton} id={styles.backButton}>{'<'}</div>
                      <div role="button" onClick={this.handleNextMonth} className={styles.roundButton} id={styles.forwardButton}>{'>'}</div>
                    </div>
                    <div id={styles.calendarHeader}>{showFullMonthYear(calFirstOfMonth)}</div>
                  </div>
                  <div id={styles.dayOfWeekRow}>
                    {dayOfWeekAbbr.map(dayOfWeek => <div key={dayOfWeek} className={styles.dayOfWeek}>{dayOfWeek}</div>)}
                  </div>
                  <div style={{ display: 'table-row-group' }}>
                    {_.range(6).map(i => (
                      <div key={`row${i}`} style={{ display: 'table-row' }}>
                        {datesToShow.slice(i * 7, (i + 1) * 7).map(date => (
                          <div key={date} className={styles.calendarCell}>{date.getUTCDate()}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
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

/*
<div role="button" onClick={this.handlePrevMonth} style={{ position: 'absolute', left: '1rem', backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.24 8.07'><g><path style='fill:%23333' d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'/></g></svg>")` }}></div>


    const svgString = encodeURIComponent(renderToStaticMarkup(<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.24 8.07'><g><path style={{fill: '%23333'}} d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'/></g></svg>));
    console.log(svgString);
    const dataUri = `url("data:image/svg+xml,${svgString}")`;


*/

