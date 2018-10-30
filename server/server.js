const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const config = require('./config');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const conn = mysql.createConnection({
  user: config.USER,
  password: config.PASSWORD,
  database: 'resy_db',
});

const db = Promise.promisifyAll(conn, { multiArgs: true });

db.connect((err) => {
  if (err) throw err;
  console.log('Connected');
});

// CURDATE() in production
app.get('/reservations/timesBookedToday/:restaurant_id', (req, res) => {
  db.queryAsync(`
    SELECT COUNT(*) AS cnt
    FROM reservations r JOIN inventory i ON r.inventory_id = i.id
    WHERE restaurant_id = ${req.params.restaurant_id}
    AND DATE(booked_at) = '2019-10-03'
  `, (err, result) => {
    if (err) res.send('-1');
    res.send(String(result[0].cnt));
  })
    .error(() => res.send('-1'));
});

/*
// TODO: fetch availability based on specified party size, date, time
//   if party too large, set availableSlots to [], stage to 'partyTooLarge'
//   if too far in advance, set availableSlots to [], stage to 'tooFarInAdvance'
// if available: set availableSlots, stage to 'selectTime'
    // else set availableSlots to [], stage to 'notAvailable'
*/

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
