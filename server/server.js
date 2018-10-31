const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const config = require('./config');
const { primitiveToSQL, numStrToPrimitive } = require('../client/components/helper');

const port = 3000;

const TEST_TODAY_DATE = '"2019-10-03"';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const conn = mysql.createConnection({
  user: config.USER,
  password: config.PASSWORD,
  database: 'resy_db',
  timezone: 'UTC+0',
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
  AND DATE(booked_at) = ${TEST_TODAY_DATE}
  `).then((result) => {
    res.send(String(result[0][0].cnt));
  }).catch(() => res.send('-1'));
});

app.get('/reservations/inventory', (req, res) => {
  const { restaurantId, dateTime, party } = req.query;

  const requestedDateTime = numStrToPrimitive(dateTime);
  const fromDateTime = new Date(requestedDateTime.valueOf() - 2.5 * 60 * 60 * 1000);
  const toDateTime = new Date(requestedDateTime.valueOf() + 2.5 * 60 * 60 * 1000);

  db.queryAsync(`
    SELECT *
    FROM inventory
    WHERE restaurant_id = ${restaurantId}
    AND party >= ${party}
    LIMIT 1
  `).then((result) => {
    if (result[0].length === 0) {
      res.send({
        stage: 'partyTooLarge',
        availableSlots: [],
      });
    }
    return db.queryAsync(`
      SELECT *
      FROM inventory
      WHERE restaurant_id = ${restaurantId}
      AND avail_at <= ${primitiveToSQL(requestedDateTime)}
      LIMIT 1
    `);
  }).then((result) => {
    if (result[0].length === 0) {
      res.send({
        stage: 'tooFarInAdvance',
        availableSlots: [],
      });
    }
    return db.queryAsync(`
      SELECT DISTINCT avail_at
      FROM inventory
      WHERE restaurant_id = ${restaurantId}
      AND avail_at >= ${primitiveToSQL(fromDateTime)} AND avail_at <= ${primitiveToSQL(toDateTime)}
      AND quantity > 0
      ORDER BY avail_at
    `);
  }).then((result) => {
    const availableSlots = result[0].map(row => row.avail_at);
    if (availableSlots.length === 0) throw availableSlots;
    res.send({
      stage: 'success',
      availableSlots,
    });
  }).catch(() => {
    res.send({
      stage: 'notAvailable',
      availableSlots: [],
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
