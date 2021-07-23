'use strict';

const util = require('util'); // Remove when testing done

class DistancesCalculator {

    constructor(key) {
        this.csvProcessor = require('./csvprocessor');
        this.distanceMatrix = require('./distancematrix')(key);
    }

    processFile(file, callback, done) {
        const localCallback = (destination, origin, additionalFields) => {
                this.processLine(destination, origin, additionalFields, callback)
            }

        this.csvProcessor.processFile(file, localCallback, done);
    }

    processLine(destination, origin, additionalFields, callback) {
        this.distanceMatrix.calculate(origin, destination, function(distanceData){
            callback(origin, destination, additionalFields, distanceData);
        });
    }

    calculateDistance(origin, destination, callback) {
        this.distanceMatrix.calculate(origin, destination, callback);
    }
}

module.exports = function(key) {
    return new DistancesCalculator(key);
};
