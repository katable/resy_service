const mysql = require('mysql');
const Promise = require('bluebird');
const _ = require('underscore');
const database = 'resy_db';

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
const lastDateTime = (2020-1970)*365.25*24*60*60*1000
                     + 182 * 24 * 60 * 60 * 1000
                     - 30 * 60 * 1000;
const increment30Mins = 30 * 60 * 1000;

const dateTimeTypes = {
  all: _.range(firstDateTime, lastDateTime, increment30Mins),
};

dateTimeTypes.most = dateTimeTypes.all.filter(
  (dt) => !([1, 3].includes(dt.getDay()))
);
dateTimeTypes.few = dateTimeTypes.all.filter(
  (dt) => [1, 3].includes(dt.getDay() && dt.getDate() < 10 && dt.getDate() > 20)
);

const quantityTypes = {
  normal: [4, 5, 6],
  limited: [1, 2],
  scattered: [1, 5, 10],
}



const conn = mysql.createConnection({
  user: 'student',
  password: 'student',
});

const db = Promise.promisifyAll(conn, {multiArgs: true});

db.connectAsync()
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => db.queryAsync(`
    CREATE TABLE inventory (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      party INT NOT NULL,
      avail_at TIMESTAMP NOT NULL,
      special_seating INT,
      points INT,
      quantity INT,
      FOREIGN KEY inventory_id REFERENCES inventory(id)
    )
  `).then(() => db.queryAsync(`
    CREATE TABLE reservations (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      inventory_id INT NOT NULL,
      booked_at TIMESTAMP NOT NULL
    )
  `).then(