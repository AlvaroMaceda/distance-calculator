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

    // A test to include departure time, but it doesn't matter very much (+-5m max)
    departureTime() {
        const a_monday_at_9_am = '2021-10-11 09:00'
        const departure = new Date(a_monday_at_9_am)
        const secondsSinceEpoch = Math.round(departure.getTime() / 1000)

        return secondsSinceEpoch
    }

    calculate(origin, destination, callback) {
        // const departure_time = this.departureTime()

        let data = {
            units: 'metric',
            key: this.key,
            origins: origin,
            destinations: destination,
            // departure_time: departure_time
        };
        let url = this.API_HOST + this.API_URL + '?'+ encodeData(data);

        request.get({
            url: url,
            json: true
        }, function(err, res, body) {
            if (err) throw err;
            if(body.status!=='OK') throw new Error(body.error_message);

            let distanceData = {};

            if (body.rows[0].elements[0].status==='OK') {
                distanceData = {
                    distance: body.rows[0].elements[0].distance.value,
                    distanceText: body.rows[0].elements[0].distance.text,
                    duration: body.rows[0].elements[0].duration.value,
                    durationText: body.rows[0].elements[0].duration.text
                };
            }

            callback(distanceData);
        });

    }
}
DistanceMatrix.prototype.API_HOST = 'https://maps.googleapis.com';
DistanceMatrix.prototype.API_URL = '/maps/api/distancematrix/json';

module.exports = function(key) {
    return new DistanceMatrix(key);
};
