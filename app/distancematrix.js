'use strict';

const request = require('request');

function encodeData(data) {
    let map = data.map( (parameter) => {
        return Object.keys(parameter).map( (key) => {
            return [key, parameter[key]].map(encodeURIComponent).join("=");
        });
    });
    return map.join("&");
}

class DistanceMatrix {

    constructor(key) {
        this.setKey(key);
    }

    setKey(key) {
        this.key = key;
    }

    calculate(origin, destination, callback) {
        let data =  [
            { units: 'metric' },
            { key: this.key },
            { origins: origin },
            { destinations: destination }
        ];
        let url = this.API_URL + '/'+ encodeData(data);

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
DistanceMatrix.prototype.API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

module.exports = function(key) {
    return new DistanceMatrix(key);
};