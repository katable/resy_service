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
    CREATE TABLE reservations (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL
    )
  `)