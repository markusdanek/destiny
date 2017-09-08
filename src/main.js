'use strict';

import {Promise} from 'es6-promise';
import _ from 'lodash';
import {UTILS} from './utils';
import ENDPOINTS from './endpoints';

if (!global.fetch) {
    require('isomorphic-fetch');
}

var HOST = 'https://www.bungie.net/platform/Destiny2/';
var API_KEY;

let createRequest = (lib, method) => {

    let template = _.template(method.url);

    lib[method.name] = function(params, headers) {
        return Promise.resolve(params).then(params => {

            if (!_.isObject(params)) {
                UTILS.error(`Argument must be an Object containing: ${method.required.join(', ')}.`);
            }

            var missing = method.required.filter(function(field) {
                return !params.hasOwnProperty(field);
            });

            if (missing.length > 0) {
                UTILS.error(`Please provide [${missing.join(', ')}] to Destiny2.${method.name}()`);
            }

            return params;
        }).then(params => {
            let options = _.merge(method.options || {}, {
                headers: _.merge(headers || {}, {'x-api-key': API_KEY}),
                body: JSON.stringify(params)
            });

            if (options.method === UTILS.METHODS.GET) {
                delete options.body;
            }

            return fetch(`${HOST}${template(params)}`, options);
        }).then(UTILS.json).then(UTILS.unwrapDestinyResponse);
    };

    return lib;
};

let Destiny2 = (apiKey = undefined, host = 'https://www.bungie.net/platform/Destiny2/') => {

    if (!_.isString(apiKey) || _.isEmpty(apiKey)) {
        UTILS.error(`You must provide a valid api key. Expected: String, got: ${typeof apiKey}. Get a key at: https://www.bungie.net/developer`);
    }

    if (_.isString(host)) {
        HOST = host;
        API_KEY = apiKey;
    } else {
        UTILS.error(`${host} is not a valid URL.`);
    }

    return ENDPOINTS.reduce(createRequest, {});
};

export default Destiny2;
