import React from 'react';

const TimeSlotsLeft = ({ timeslotsLeft }) => timeslotsLeft < 5
  && <div>{`You're in luck! We still have ${timeslotsLeft} timeslots left`}</div>;

export default TimeSlotsLeft;
