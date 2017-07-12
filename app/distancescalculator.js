'use strict';

class DistancesCalculator {

    constructor() {
        this.csvProcessor = require('./csvprocessor');
        this.distanceMatrix = require('./distancematrix');
        this.outputStream = process.stdout;
    }

    set outputStream(stream) {

    }

    processFile() {
        // Por cada línea, hace un callback con los datos de la línea + la distancia
    }

    calculateDistance(origin, destination, callback) {
        // Hace un callback con los datos de la línea + la distancia
        this.distanceMatrix.calculate(origin, destination, callback);
    }

    // Private
    generateDistanceLine() {
        return 'TO-DO';
    }

}

module.exports = new DistancesCalculator();