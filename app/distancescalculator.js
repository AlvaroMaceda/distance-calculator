'use strict';

const util = require('util'); // Remove when testing done

function processLine(destination, origin, callback) {
    this.distanceMatrix.calculate(origin, destination, function(distanceData){
        console.log(util.inspect(distanceData));
        callback();
    });
}

class DistancesCalculator {

    constructor(key) {
        this.csvProcessor = require('./csvprocessor');
        this.distanceMatrix = require('./distancematrix')(key);
    }

    processFile(file, callback, done) {

        let localCallback = (function(destination, origin) {
            processLine.bind(this)(destination, origin, callback);
        }).bind(this);

        this.csvProcessor.processFile(file, localCallback, done);
    }

    calculateDistance(origin, destination, callback) {
        // Hace un callback con los datos de la línea + la distancia
        this.distanceMatrix.calculate(origin, destination, callback);
    }
}

module.exports = function(key) {
    return new DistancesCalculator(key);
};