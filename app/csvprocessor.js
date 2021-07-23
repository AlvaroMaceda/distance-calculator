'use strict';

const CSV_OPTIONS = {
    trim: true // This fails in some cases
};

class CSVProcessor {

    constructor() {
        this.csv =  require('csvtojson');
    }

    processFile(file, callback, done, error) {
        this.csv(CSV_OPTIONS)
            .fromFile(file)
            .subscribe((line) => {
                const { origin, destination, ...additionalFields } = line
                callback(destination, origin, additionalFields)
            })
    }

}

module.exports = new CSVProcessor();
