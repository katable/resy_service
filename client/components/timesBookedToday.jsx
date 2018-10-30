import React from 'react';

const TimesBookedToday = ({ timesBookedToday }) => timesBookedToday
    && <div>{`Booked ${timesBookedToday} times today`}</div>;

export default TimesBookedToday;
