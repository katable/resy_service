const AMPMToHr24 = {
  '12:00 AM': '0000',
  '12:30 AM': '0030',
  '1:00 AM': '0100',
  '1:30 AM': '0130',
  '2:00 AM': '0200',
  '2:30 AM': '0230',
  '3:00 AM': '0300',
  '3:30 AM': '0330',
  '4:00 AM': '0400',
  '4:30 AM': '0430',
  '5:00 AM': '0500',
  '5:30 AM': '0530',
  '6:00 AM': '0600',
  '6:30 AM': '0630',
  '7:00 AM': '0700',
  '7:30 AM': '0730',
  '8:00 AM': '0800',
  '8:30 AM': '0830',
  '9:00 AM': '0900',
  '9:30 AM': '0930',
  '10:00 AM': '1000',
  '10:30 AM': '1030',
  '11:00 AM': '1100',
  '11:30 AM': '1130',
  '12:00 PM': '1200',
  '12:30 PM': '1230',
  '1:00 PM': '1300',
  '1:30 PM': '1330',
  '2:00 PM': '1400',
  '2:30 PM': '1430',
  '3:00 PM': '1500',
  '3:30 PM': '1530',
  '4:00 PM': '1600',
  '4:30 PM': '1630',
  '5:00 PM': '1700',
  '5:30 PM': '1730',
  '6:00 PM': '1800',
  '6:30 PM': '1830',
  '7:00 PM': '1900',
  '7:30 PM': '1930',
  '8:00 PM': '2000',
  '8:30 PM': '2030',
  '9:00 PM': '2100',
  '9:30 PM': '2130',
  '10:00 PM': '2200',
  '10:30 PM': '2230',
  '11:00 PM': '2300',
  '11:30 PM': '2330',
};

const Hr24ToAMPM = {};

Object.entries(AMPMToHr24).forEach(([AMPM, Hr24]) => {
  Hr24ToAMPM[Hr24] = AMPM;
});

// 'YYYY-MM-DD HH:mm:ss' for MySQL insertion (extra quotes yes, 0 padding not needed)
const primitiveToSQL = (dateTime) => {
  const y = dateTime.getUTCFullYear();
  const mon = dateTime.getUTCMonth() + 1;
  const d = dateTime.getUTCDate();
  const h = dateTime.getUTCHours();
  const min = dateTime.getUTCMinutes();
  const s = dateTime.getUTCSeconds();
  return `"${y}-${mon}-${d} ${h}:${min}:${s}"`;
};

const primitiveToDisplay = (dateTime) => {
  const y = dateTime.getUTCFullYear();
  const mon = `${dateTime.getUTCMonth() + 1}`.padStart(2, '0');
  const d = `${dateTime.getUTCDate()}`.padStart(2, '0');
  const h12 = dateTime.getUTCHours() % 12;
  const min = `${dateTime.getUTCMinutes()}`.padStart(2, '0');
  const ampm = dateTime.getUTCHours() >= 12 ? 'PM' : 'AM';
  return `${y}-${mon}-${d} ${h12}:${min}${ampm}`;
};

const primitiveToDate = (primitive) => {
  const y = primitive.getUTCFullYear();
  const mon = `${primitive.getUTCMonth() + 1}`.padStart(2, '0');
  const d = `${primitive.getUTCDate()}`.padStart(2, '0');
  return `${y}${mon}${d}`;
};

const primitiveToTime = (primitive) => {
  const h24 = primitive.getUTCHours();
  const min = `${primitive.getUTCMinutes()}`.padStart(2, '0');
  return `${h24}${min}`;
};

const removeHyphen = date => date.split('-').join('');

const mapTo24Hr = time => AMPMToHr24[time];

const numStrToPrimitive = (str) => {
  const y = str.slice(0, 4);
  const mon = String(Number(str.slice(4, 6)) - 1);
  const d = str.slice(6, 8);
  const h = str.slice(8, 10);
  const min = str.slice(10);
  return new Date(Date.UTC(y, mon, d, h, min, 0));
};

const numStrToTimeAMPM = str => Hr24ToAMPM[str.slice(8)];

const dayOfWeekAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthName = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const msInADay = 24 * 60 * 60 * 1000;

const toFirstOfMonth = datePrimitive => new Date(datePrimitive.setUTCDate(1));

const addOneMonthToFOM = (firstOfMonthPrimitive) => {
  const temp = new Date(firstOfMonthPrimitive.valueOf() + 40 * msInADay);
  return toFirstOfMonth(temp);
};

const minusOneMonthFromFOM = (firstOfMonthPrimitive) => {
  const temp = new Date(firstOfMonthPrimitive - msInADay);
  return toFirstOfMonth(temp);
};

const showMonthSlashDay = (datePrimitive) => {
  const month = datePrimitive.getUTCMonth() + 1;
  const day = datePrimitive.getUTCDate();

  return `${month}/${day}`;
};

const showWeekdayMonthSlashDay = (datePrimitive) => {
  const weekday = datePrimitive.getUTCDay();

  return `${dayOfWeekAbbr[weekday]}, ${showMonthSlashDay(datePrimitive)}`;
};

const showFullMonthYear = (datePrimitive) => {
  const month = datePrimitive.getUTCMonth();
  const year = datePrimitive.getUTCFullYear();

  return `${monthName[month]} ${year}`;
};

const getDatesToShow = (calFirstOfMonth) => {
  const daysToOffset = calFirstOfMonth.getUTCDay();
  const firstDay = calFirstOfMonth - daysToOffset * msInADay;

  return Array(42).fill(null).map((_, i) => new Date(firstDay + i * msInADay));
};

const dateTimeToDate = (str) => {
  return str.slice(0, 8);
};

const dateTimeToTime = (str) => {
  return str.slice(8);
};

module.exports = {
  AMPMToHr24,
  Hr24ToAMPM,
  primitiveToSQL,
  primitiveToDisplay,
  primitiveToDate,
  primitiveToTime,
  removeHyphen,
  mapTo24Hr,
  numStrToPrimitive,
  numStrToTimeAMPM,
  dayOfWeekAbbr,
  monthName,
  msInADay,
  toFirstOfMonth,
  addOneMonthToFOM,
  minusOneMonthFromFOM,
  showMonthSlashDay,
  showWeekdayMonthSlashDay,
  showFullMonthYear,
  getDatesToShow,
  dateTimeToDate,
  dateTimeToTime,
};
