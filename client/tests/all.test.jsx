import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../components/app';
// import renderer from 'react-test-renderer';
// import toJson from 'enzyme-to-json';

import { shallow } from 'enzyme';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

const mockFetch = (data) => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
};

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
    await page.goto('http://127.0.0.1:3000/');
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

/*
await page.select('select:first-of-type', '10');

const elem = await page.$('.klyDIVfrEth1J2Z99h3Mk');
const text = await page.evaluate(elem => elem.textContent, elem);
expect(text).toEqual('For 10');
*/

// describe('Google', () => {
//   beforeAll(async () => {
//     await page.goto('https://google.com');
//   });

//   it('should display "google" text on page', async () => {
//     console.log(page.title())
//     await expect(page).toMatch('google');
//   });
// });

// describe('Component: App', () => {
//   // const items = ['Learn react', 'rest', 'go out'];
//   window.fetch = mockFetch('2');

//   it('should pass', () => {
//     const wrapper = shallow(<App />);
//     const partySizeState = wrapper.state().partySize;

//     expect(partySizeState).toEqual('2');
//   });

  // it('should match its empty snapshot', () => {
  //   const tree = renderer.create(
  //     <App />
  //   ).toJSON();

  //   expect(tree).toMatchSnapshot();
  // });

  // it('should add an item based on the value in the state', () => {
  // 	const component = shallow(<App />);
  //   const preventDefault = jest.fn();
  //   component.setState({
  //     items
  //   });
  //   component.find('form').simulate('submit', { preventDefault });
  // 	expect(toJson(component)).toMatchSnapshot();
  //   expect(preventDefault).toBeCalled();
  // });

  // it('should pass a selected value to the onChange function', () => {
  //   const tree = renderer.create(
  //     <App />
  //   );
  //   const component = shallow(<App items={items} />);
  //   component.find('input').simulate('change', { target: {
  //     value: 'Change function' }
  //   });

  //   expect(toJson(component)).toMatchSnapshot();
  // });
//});