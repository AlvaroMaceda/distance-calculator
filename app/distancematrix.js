'use strict';

const request = require('request');

function encodeData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

class DistanceMatrix {

    constructor(key) {
        this.setKey(key);
    }

    setKey(key) {
        this.key = key;
    }

    calculate(origin, destination, callback) {
        let data =  {
            units: 'metric',
            key: this.key,
            origins: origin,
            destinations: destination
        };
        let url = this.API_URL + encodeData(data);

        request.get({
            url: url,
            json: true
        }, function(err, res, body) {
            let distance;
            let time;
            console.log('do something');
            callback(distance, time);
        });

    }
}
DistanceMatrix.prototype.API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

module.exports = function(key) {
    return new DistanceMatrix(key);
};