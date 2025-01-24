import csvProcessor from './csvprocessor.js'
import distanceMatrix from './distancematrix.js'

class DistancesCalculator {

    constructor(key) {
        this.csvProcessor = csvProcessor;
        this.distanceMatrix = distanceMatrix(key);
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

export default function(key) {
    return new DistancesCalculator(key);
};
