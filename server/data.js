const _ = require('underscore');

/*
 *  Generate data for the "inventory" table
 */

const partyTypes = {
  all: _.range(1, 21),
  small: _.range(1, 7),
  large: _.range(15, 21),
  scattered: [1, 10, 20],
};

// 2018-07-01 00:00:00 to 2020-06-30 23:30:00 in 30-min increments
// values in milliseconds from 1970-01-01 00:00:00
const firstDateTime = (2018 - 1970) * 365.25 * 24 * 60 * 60 * 1000
                      - 184 * 24 * 60 * 60 * 1000;
const lastDateTime = (2020 - 1970) * 365.25 * 24 * 60 * 60 * 1000
                     + 182 * 24 * 60 * 60 * 1000
                     - 30 * 60 * 1000;
const increment30Mins = 30 * 60 * 1000;

const dateTimeTypes = {
  all: _.range(firstDateTime, lastDateTime, increment30Mins),
  most: null,
  few: null,
};

dateTimeTypes.most = dateTimeTypes.all.filter((dt) => {
  return !([1, 3].includes(dt.getDay()));
});

dateTimeTypes.few = dateTimeTypes.all.filter((dt) => {
  return [1, 3].includes(dt.getDay())
    && dt.getDate() < 10 && dt.getDate() > 20
    && dt.getHours() >= 18 && dt.getHours() <= 19;
});

const quantityTypes = {
  normal: [4, 5, 6],
  limited: [1, 2],
  scattered: [1, 5, 10],
};

const restaurantNum = _.size(partyTypes) * _.size(dateTimeTypes) * _.size(quantityTypes);

// [id] restaurant_id, party, avail_at, special_seating, points, quantity
const inventoryData = [];

_.range(1, restaurantNum + 1).forEach((rest_id) => {
  Object.values(partyTypes).forEach((partyRange) => {
    partyRange.forEach((party) => {
      Object.values(dateTimeTypes).forEach((dateTimeRange) => {
        dateTimeRange.forEach((dateTime) => {
          Object.values(quantityTypes).forEach((quantityRange) => {
            quantityRange.forEach((quantity) => {
              inventoryData.push([rest_id, party, dateTime, null, null, quantity]);
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
const reservationsData = [];

_.range(1, inventoryData + 1, 10).forEach((invId) => {
  const bookedAt = firstDateTime - (1 + Math.random()) * (30 * 24 * 60 * 60 * 1000);
  reservationsData.push([123, invId, bookedAt]);
});

exports.inventoryData = inventoryData;
exports.reservationsData = reservationsData;
