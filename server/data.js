const _ = require('underscore');

// 'YYYY-MM-DD HH:mm:ss' for MySQL insertion (extra quotes yes, 0 padding not needed)
const format = (dateTime) => {
  const y = dateTime.getFullYear();
  const mon = dateTime.getMonth() + 1;
  const d = dateTime.getDate();
  const h = dateTime.getHours();
  const min = dateTime.getMinutes();
  const s = dateTime.getSeconds();
  return `"${y}-${mon}-${d} ${h}:${min}:${s}"`;
};

/*
 *  Generate data for the "inventory" table
 */

const partyTypes = {
  // all: _.range(1, 21),
  small: _.range(1, 3),
  large: _.range(19, 21),
  scattered: [1, 10],
};

// 2019-12-01 00:00:00 to 2020-03-31 23:30:00 in 30-min increments
// values in milliseconds from 1970-01-01 00:00:00
const firstDateTime = (2020 - 1970) * 365.25 * 24 * 60 * 60 * 1000
                      - 31.5 * 24 * 60 * 60 * 1000;
const lastDateTime = (2020 - 1970) * 365.25 * 24 * 60 * 60 * 1000
                     + 90.5 * 24 * 60 * 60 * 1000
                     - 30 * 60 * 1000;
const increment30Mins = 30 * 60 * 1000;

const allTimeSlots = _.range(firstDateTime, lastDateTime, increment30Mins)
  .map(millisec => new Date(millisec));

const dateTimeTypes = {
  most: allTimeSlots.filter(dt =>
    [5, 6].includes(dt.getDay()) &&
    ((dt.getHours() >= 20 && dt.getHours() <= 22) ||
     (dt.getHours() >= 11 && dt.getHours() <= 13))
  ),
  few: allTimeSlots.filter(dt =>
    [1, 3].includes(dt.getDay()) &&
    (dt.getDate() < 5 || dt.getDate() > 26) &&
    dt.getHours() >= 18 && dt.getHours() <= 19
  ),
};

const quantityTypes = {
  normal: [4, 5],
  limited: [1, 2],
  scattered: [1, 10],
};

const seatingTypes = {
  standard: 'NULL',
  bar: 1,
  counter: 2,
};

const pointsTypes = {
  standard: 'NULL',
  extra: 1000,
};

// [id] restaurant_id, party, avail_at, special_seating, points, quantity
const availableTimeslots = [];

let restId = 0;
Object.values(partyTypes).forEach((partyRange) => {
  Object.values(dateTimeTypes).forEach((dateTimeRange) => {
    Object.values(quantityTypes).forEach((quantityRange) => {
      Object.values(seatingTypes).forEach((seating) => {
        Object.values(pointsTypes).forEach((points) => {
          restId += 1;
          partyRange.forEach((party) => {
            dateTimeRange.forEach((availAt) => {
              quantityRange.forEach((quantity) => {
                availableTimeslots.push([restId, party, format(availAt), seating, points, quantity]);
              });
            });
          });
        });
      });
    });
  });
});

/*
 *  Generate data for the "reservations" table
 */

// [id] user_id, inventory_id, booked_at
// 1 reservation already made for every 10th inventory type
// booked_at can be way before when the inventory is available
const reservedTimeslots = [];

_.range(1, availableTimeslots.length + 1, 10).forEach((invId) => {
  const bookedAt = new Date(firstDateTime - (1 + Math.random()) * (30 * 24 * 60 * 60 * 1000));
  reservationsData.push([123, invId, format(bookedAt)]);
});

exports.inventoryData = inventoryData;
exports.reservationsData = reservationsData;
