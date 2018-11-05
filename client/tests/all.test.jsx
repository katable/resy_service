import React from 'react';
import App from '../components/app';
import { shallow } from 'enzyme';

/*

Some pre-determined parameters and data for testing
===================================================
Today's date:                 2019-10-03                    // server.js:  const TEST_TODAY_DATE = '"2019-10-03"';
Initialized reservation date: 2020-03-27                    // app.jsx:    this.date = '2020-03-27';
Initialized reservation time: 9:00 PM                       // app.jsx:    this.time = '9:00 PM';
Initialized party size: 2                                   // app.jsx:    this.state.partySize: '2'
Initialized restaurant name:  Alinea                        // app.jsx:    this.restaurantName = 'Alinea';

Data
====
How many times boooked today?  9
// SELECT COUNT(*) FROM reservations r JOIN inventory i ON r.inventory_id = i.id WHERE restaurant_id = 1 AND DATE(booked_at) = '2019-10-03';

Available timeslots: quantity = 4-5 for each of 8:00 PM - 10:30 PM in 30-min increments
// SELECT * FROM inventory WHERE DATE(avail_at) = '2020-03-27' AND TIME(avail_at)>='14:00:00' AND restaurant_id = 1 AND party = 2;

*/

describe('App', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:3002/');
  });

  it('should display the selected party size', async () => {
    await page.select('.test-partySize-select', '10');
    const elem = await page.$('.test-partySize-text');
    const text = await page.evaluate(elem => elem.textContent, elem);
    expect(text).toEqual('For 10');
  });

  it('should display the selected time', async () => {
    await page.select('.test-time-select', '1:00 PM');
    const elem = await page.$('.test-time-text');
    const text = await page.evaluate(elem => elem.textContent, elem);
    expect(text).toEqual('1:00 PM');
  });

  it('should show the correct number of times booked', async () => {
    const elem = await page.$('.test-timesBooked-text');
    const text = await page.evaluate(elem => elem.textContent, elem);
    expect(text).toEqual('Booked 9 times today');
  });

});
