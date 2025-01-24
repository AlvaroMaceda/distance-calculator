import csvProcessor from './csvprocessor.js'
import DistanceMatrix from './distancematrix.js'

class DistancesCalculator {

    #csvProcessor;
    #distanceMatrix;

    constructor(key, mode, origin) {
        this.#csvProcessor = csvProcessor;
        this.#distanceMatrix = new DistanceMatrix(key, mode, origin);
    }

    processFile(file, callback, done) {
        const localCallback = (destination, origin, additionalFields) => {
                this.processLine(destination, origin, additionalFields, callback)
            }

        this.#csvProcessor.processFile(file, localCallback, done);
    }

    processLine(destination, origin, additionalFields, callback) {
        this.#distanceMatrix.calculate(origin, destination, function(distanceData){
            callback(distanceData.origin, distanceData.destination, additionalFields, distanceData);
        });
    }

    calculateDistance(origin, destination, callback) {
        this.#distanceMatrix.calculate(origin, destination, callback);
    }
}

export default DistancesCalculator;
