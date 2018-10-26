const mysql = require('mysql');
const Promise = require('bluebird');
const database = 'resy_db';







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