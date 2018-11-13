const mysql = require('mysql');
const Promise = require('bluebird');
const data = require('./data');
const config = require('./config');

const conn = mysql.createConnection({
  host: 'mysql.c3xdtkqpt36v.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: config.USER,
  password: config.PASSWORD,
  timezone: 'UTC+0',
});

const db = Promise.promisifyAll(conn, { multiArgs: true });

db.connectAsync()
  .then(() => db.queryAsync('DROP DATABASE IF EXISTS resy_db'))
  .then(() => db.queryAsync('CREATE DATABASE resy_db'))
  .then(() => db.queryAsync('USE resy_db'))
  .then(() => db.queryAsync(`
    CREATE TABLE inventory (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      party INT NOT NULL,
      avail_at TIMESTAMP NOT NULL,
      special_seating INT,
      points INT,
      quantity INT
    )
  `))
  .then(() => db.queryAsync(`
    CREATE TABLE reservations (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      inventory_id INT NOT NULL,
      booked_at TIMESTAMP NOT NULL,
      FOREIGN KEY (inventory_id) REFERENCES inventory(id)
      ON DELETE CASCADE
    )
  `))
  .then(() => db.queryAsync(`
    INSERT INTO inventory
      (restaurant_id, party, avail_at, special_seating, points, quantity)
    VALUES
      ${data.inventoryData.map(row => '(' + row.join(',') + ')').join(',')}
  `))
  .then(() => db.queryAsync(`
  INSERT INTO reservations
    (user_id, inventory_id, booked_at)
  VALUES
    ${data.reservationsData.map(row => '(' + row.join(',') + ')').join(',')}
  `))
  .then(() => db.end())
  .error(err => console.log(err));
