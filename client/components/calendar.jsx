import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {
  numStrToPrimitive, dayOfWeekAbbr, addOneMonthToFOM, minusOneMonthFromFOM,
  showWeekdayMonthSlashDay, showFullMonthYear,
  toFirstOfMonth, getDatesToShow, msInADay, primitiveToDate,
} from './helper';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { dateTime } = props;

    this.state = {
      showCalendar: false,
      calFirstOfMonth: toFirstOfMonth(numStrToPrimitive(dateTime)),
    };

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
  }

  toggleCalendar() {
    const { showCalendar } = this.state;
    const { dateTime } = this.props;

    this.setState({
      showCalendar: !showCalendar,
      calFirstOfMonth: toFirstOfMonth(numStrToPrimitive(dateTime)),
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

  render() {
    const { showCalendar, calFirstOfMonth } = this.state;
    const { dateTime, handleChangeDate } = this.props;
    const selectedDate = numStrToPrimitive(dateTime);
    const datesToShow = getDatesToShow(calFirstOfMonth);
    const today = new Date();
    const prevMonthDisabled = showFullMonthYear(today) === showFullMonthYear(calFirstOfMonth);

    return (
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Date</div>
        <div role="button" onClick={this.toggleCalendar} className={`${styles.inputFieldContainer} test-date-button`}>
          <div className={`${styles.inputFieldSelected} test-date-text`}>{showWeekdayMonthSlashDay(selectedDate)}</div>
          {svg.downCaret}
        </div>
        {
          showCalendar
          && (
            <div>
              <div onClick={this.toggleCalendar} id={styles.fullScreenBlankCanvas} />
              <div id={styles.calendarOuterContainer}>
                <div id={styles.calendarInnerContainer}>
                  <div id={styles.calendarCaption}>
                    <div>
                      <button
                        disabled={prevMonthDisabled}
                        onClick={this.handlePrevMonth}
                        className={`${styles.roundButton} ${prevMonthDisabled ? styles.disabled : ''}`}
                        id={styles.backButton}
                      >{'<'}</button>
                      <button onClick={this.handleNextMonth} className={styles.roundButton} id={styles.forwardButton}>{'>'}</button>
                    </div>
                    <div id={styles.calendarHeader}>{showFullMonthYear(calFirstOfMonth)}</div>
                  </div>
                  <div id={styles.dayOfWeekRow}>
                    {dayOfWeekAbbr.map(dayOfWeek => <div key={dayOfWeek} className={styles.dayOfWeek}>{dayOfWeek}</div>)}
                  </div>
                  <div style={{ display: 'table-row-group' }}>
                    {_.range(6).map(i => (
                      <div key={`row${i}`} style={{ display: 'table-row' }}>
                        {datesToShow.slice(i * 7, (i + 1) * 7).map((date) => {
                          const classIsInCurrentMonth = date.getUTCMonth() === calFirstOfMonth.getUTCMonth() ? styles.isInCurrentMonth : '';
                          const classIsDisabled = today - msInADay >= date ? styles.disabled : '';
                          const classIsSelected = Number(date) === Number(selectedDate) ? styles.selectedDate : '';

                          return (<div
                            key={primitiveToDate(date)}
                            id={primitiveToDate(date)}
                            className={`${styles.calendarCell} ${classIsInCurrentMonth} ${classIsDisabled} ${classIsSelected}`}
                            disabled={today - msInADay >= date}
                            onClick={(e) => {handleChangeDate(e); this.toggleCalendar()}}
                          >{date.getUTCDate()}</div>);
                          })}
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
