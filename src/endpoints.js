'use strict';
import {UTILS} from './utils';

let GET = [
    {
        name: 'Search',
        url: 'SearchDestinyPlayer/${ membershipType }/${ name }/',
        required: ['membershipType', 'name']
    }, {
        name: 'Profile',
        url: '${ membershipType }/Profile/${ membershipId }?components=100',
        required: ['membershipType', 'membershipId']
    }, {
        name: 'Character',
        url: '${ membershipType }/Profile/${ membershipId }/Character/${ characterId }?components=200',
        required: ['membershipType', 'membershipId', 'characterId']
    }
].map(UTILS.assignMap({
    options: {
        method: UTILS.METHODS.GET,
        headers: UTILS.HEADERS
    }
}));

let ENDPOINTS = [].concat(GET);

export default ENDPOINTS;
