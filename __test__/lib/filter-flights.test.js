'use strict';

const filterFlights = require('../../filter-flights/filter-flights');
require('jest');

let data = [ { destination: 'DEN',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '88.60',
  airline: 'UA' },
{ destination: 'ICN',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '188.60',
  airline: 'UA' },
{ destination: 'LHR',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '288.60',
  airline: 'UA' } ];

let usaAnswer = [ { destination: 'DEN',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '88.60',
  airline: 'UA' }];

let euAnswer = [ { destination: 'LHR',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '288.60',
  airline: 'UA' }];

let asiaAnswer = [ { destination: 'ICN',
  departure_date: '2018-04-17',
  return_date: '2018-04-19',
  price: '188.60',
  airline: 'UA' }];

describe('Check checkArea fucntion', function () {

  describe('Valid Requests', () => {
    it('should return only US airports', () => {
      expect(filterFlights(data, 'usa')).toEqual(usaAnswer);
    });
    it('should return only EU airports', () => {
      expect(filterFlights(data, 'eu')).toEqual(euAnswer);
    });
    it('should return only ASIA airports', () => {
      expect(filterFlights(data, 'asia')).toEqual(asiaAnswer);
    });
    it('should return only ALL airports', () => {
      expect(filterFlights(data, 'all')).toEqual(data);
    });
  });

  describe('Invalid Requests', () => {
    it('should throw an error when a false argument is provided for country', () => {
      expect(() => filterFlights(data, '')).toThrow('Invalid country');
    });
  });

});
