'use strict';

const debug = require('debug')('filter-flights');

// Top most popular airports from us, asia, and eu
// These are currently the only airports/cities supported
const airports = {
  usa: new Set([
    'ATL', 'LAX', 'ORD', 'DFW', 'JFK', 'DEN', 'SFO', 'LAS', 'CLT', 'SEA', 'PHX',
    'MIA', 'MCO', 'IAH', 'EWR', 'MSP', 'BOS', 'DTW', 'PHL', 'LGA', 'FLL', 'BWI',
    'DCA', 'SLC', 'MDW', 'IAD', 'SAN', 'HNL', 'TPA', 'PDX',
  ]),
  asia: new Set([
    'SIN', 'HND', 'HKG', 'ICN', 'KUL', 'NRT', 'PEK', 'KIX', 'CGK', 'TPE', 'BBK',
    'MNK', 'CAN', 'DEL', 'BOM', 'DXB', 'PVG', 'HAN', 'BLG', 'SGN', 'CRK', 'KHI',
    'DPS', 'JED', 'DMK', 'SHA', 'CTU', 'MAA', 'AUH', 'DOH','SUB', 'SZX', 'HYD',
    'DVO', 'KTM', 'CKG', 'XIY', 'CJU', 'IST', 'RUN', 'NKG','LHE', 'GMP', 'ISB',
    'DAC', 'KHH', 'CSK', 'THR', 'JHB', 'NGO',
  ]),
  eu: new Set([
    'LHR', 'AMS', 'CDG', 'FRA', 'BCN', 'ZRH', 'LGW', 'MUC', 'FCO', 'MAD', 'OSL',
    'BRU', 'ARN', 'CPH', 'ATH', 'JER', 'MXP', 'TXL', 'STN', 'NCE', 'IST', 'VIE',
    'HEL', 'WAW', 'ORY', 'GVA', 'TLS', 'GLA', 'CGN', 'EDI','DUB', 'LTN', 'PRG',
    'LIS', 'LYS', 'SXF', 'GIB', 'KEF', 'ALC', 'MAN', 'LCY','DUS', 'AGP', 'BHX',
    'HAM', 'STR', 'BFS', 'SVO', 'BUD', 'BSL', 'CTA',
  ]),
};

// Filter the flights to only the ones supported
module.exports = (flightResults, country) => {
  debug('filter-flights: country:', country, 'flightResults:', flightResults);
  if (!country) throw new Error('Invalid country');

  country = country.toString().toLowerCase();

  // Return all if necessary
  if (country === 'all') {
    debug('filter-flights: returning all flights');
    return flightResults;
  }

  return flightResults.filter(flight =>
    airports[country].has(flight.destination.toString().toUpperCase())
  );
};
