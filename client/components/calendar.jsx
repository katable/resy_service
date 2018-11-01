import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {
  numStrToPrimitive, dayOfWeekAbbr, addOneMonthToFOM, minusOneMonthFromFOM,
  showWeekdayMonthSlashDay, showFullMonthYear,
  toFirstOfMonth, getDatesToShow,
} from './helper';
//import { url } from 'inspector'; 
import { renderToStaticMarkup } from 'react-dom/server';

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
      <div style={{ flex: '1 50%', textAlign: 'left' }}>
        <div style={{ paddingBottom: '.25rem'}}>Date</div>
        <div role="button" onClick={this.toggleCalendar} style={{ height: '35px', position: 'relative', borderBottom: '1px solid #d8d9db' }}>
          <div style={{ position: 'absolute', height: 'calc(100% - 2px', paddingTop: '2px' }}>{showWeekdayMonthSlashDay(selectedDate)}</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24" style={{ position: 'absolute', top: 0, right: '9px', height: '100%', width: '0.5rem' }}>
            <path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}}>
            </path>
          </svg>
        </div>
        {
          showCalendar
          && (
            <div>
              <div onClick={this.toggleCalendar} style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1 }}></div>
              <div style={{ backgroundColor: '#f1f2f4', border: '1px solid #d8d9db', position: 'absolute', zIndex: 2, padding: '1rem 0' }}>
                <div style={{ display: 'table', width: '256px', margin: '0 1rem' }}>
                  <div style={{ display: 'table-caption', height: '34px' }}>
                    <div>
                      <div role="button" onClick={this.handlePrevMonth} style={{ position: 'absolute', left: '1rem', height: '32px', width: '32px', border: '1px solid #d8d9db', borderRadius: '50%' }}>{'<'}</div>
                      <div role="button" onClick={this.handleNextMonth} style={{ position: 'absolute', right: '1rem', height: '32px', width: '32px', border: '1px solid #d8d9db', borderRadius: '50%' }}>{'>'}</div>
                    </div>
                    <div style={{ textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>{showFullMonthYear(calFirstOfMonth)}</div>
                  </div>
                  <div style={{ display: 'table-row', height: '34px' }}>
                    {dayOfWeekAbbr.map(dayOfWeek => <div key={dayOfWeek} style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'middle' }}>{dayOfWeek}</div>)}
                  </div>
                  <div style={{ display: 'table-row-group' }}>

                    {_.range(6).map(i => (
                      <div key={`row${i}`} style={{ display: 'table-row' }}>
                        {datesToShow.slice(i * 7, (i + 1) * 7).map(date => (
                          <div key={date} style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', fontWeight: 500, border: '1px solid #d8d9db', height: '32px', width: '32px' }}>{date.getUTCDate()}</div>
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

