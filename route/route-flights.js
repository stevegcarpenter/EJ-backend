'use strict';

const filterFlights = require('../filter-flights/filter-flights');
const bearerAuth = require('../lib/bearer-auth');
const lowfareSearch = require('../lib/amadeus-middleware').lowfareSearch;
const inspirationSearch = require('../lib/amadeus-middleware').inspirationSearch;


module.exports = function(router) {
  router.get('/lowfare-search', bearerAuth, lowfareSearch, (request, response) => {
    let flights = request.lowfare.results.map(flight => flight);
    response.status(200).json(flights);
  });

  router.get('/inspiration-search', bearerAuth, inspirationSearch, (request, response) => {
    // Filter flights to the allowed country
    let flights = filterFlights(request.inspiration.results, request.query.area);
    response.status(200).json(flights);
  });
};
