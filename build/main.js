'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _endpoints = require('./endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

if (!global.fetch) {
    require('isomorphic-fetch');
}

var HOST = 'https://www.bungie.net/platform/Destiny2/';
var API_KEY;

var createRequest = function createRequest(lib, method) {

    var template = _lodash2['default'].template(method.url);

    lib[method.name] = function (params, headers) {
        return _es6Promise.Promise.resolve(params).then(function (params) {

            if (!_lodash2['default'].isObject(params)) {
                _utils.UTILS.error('Argument must be an Object containing: ' + method.required.join(', ') + '.');
            }

            var missing = method.required.filter(function (field) {
                return !params.hasOwnProperty(field);
            });

            if (missing.length > 0) {
                _utils.UTILS.error('Please provide [' + missing.join(', ') + '] to Destiny2.' + method.name + '()');
            }

            return params;
        }).then(function (params) {
            var options = _lodash2['default'].merge(method.options || {}, {
                headers: _lodash2['default'].merge(headers || {}, { 'x-api-key': API_KEY }),
                body: JSON.stringify(params)
            });

            if (options.method === _utils.UTILS.METHODS.GET) {
                delete options.body;
            }

            return fetch('' + HOST + template(params), options);
        }).then(_utils.UTILS.json).then(_utils.UTILS.unwrapDestinyResponse);
    };

    return lib;
};

var Destiny2 = function Destiny2() {
    var apiKey = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? 'https://www.bungie.net/platform/Destiny2/' : arguments[1];

    if (!_lodash2['default'].isString(apiKey) || _lodash2['default'].isEmpty(apiKey)) {
        _utils.UTILS.error('You must provide a valid api key. Expected: String, got: ' + typeof apiKey + '. Get a key at: https://www.bungie.net/developer');
    }

    if (_lodash2['default'].isString(host)) {
        HOST = host;
        API_KEY = apiKey;
    } else {
        _utils.UTILS.error(host + ' is not a valid URL.');
    }

    return _endpoints2['default'].reduce(createRequest, {});
};

exports['default'] = Destiny2;
module.exports = exports['default'];