'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

/**
 * List of GET Endpoints available on the Destiny API
 */
var GET = [{ name: 'Search', url: 'SearchDestinyPlayer/${ membershipType }/${ name }/', required: ['membershipType', 'name'] }, { name: 'Profile', url: '${ membershipType }/Profile/${ membershipId }?components=100', required: ['membershipType', 'membershipId'] }, { name: 'Character', url: '${ membershipType }/Profile/${ membershipId }/Character/${ characterId }?components=200', required: ['membershipType', 'membershipId', 'characterId'] }].map(_utils.UTILS.assignMap({ options: { method: _utils.UTILS.METHODS.GET, headers: _utils.UTILS.HEADERS } }));

var ENDPOINTS = [].concat(GET);

exports['default'] = ENDPOINTS;
module.exports = exports['default'];