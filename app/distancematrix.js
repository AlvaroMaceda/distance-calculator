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
        let data = {
            units: 'metric',
            key: this.key,
            origins: origin,
            destinations: destination
        };
        let url = this.API_HOST + this.API_URL + '?'+ encodeData(data);

        request.get({
            url: url,
            json: true
        }, function(err, res, body) {
            if (err) throw err;
            let distanceData = {
                distance: body.rows[0].elements[0].distance.value,
                distanceText: body.rows[0].elements[0].distance.text,
                duration: body.rows[0].elements[0].duration.value,
                durationText: body.rows[0].elements[0].duration.text
            };
            console.log('do something');
            callback(distanceData);
        });

    }
}
DistanceMatrix.prototype.API_HOST = 'https://maps.googleapis.com';
DistanceMatrix.prototype.API_URL = '/maps/api/distancematrix/json';

module.exports = function(key) {
    return new DistanceMatrix(key);
};