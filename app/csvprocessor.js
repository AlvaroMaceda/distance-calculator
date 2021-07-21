'use strict';

const CSV_OPTIONS = {
    noheader:true,
    headers: ['destination','origin'],
    trim: true, // This fails in some cases
};

class CSVProcessor {

    constructor() {
        this.csv =  require('csvtojson');
    }

    processFile(file, callback, done, error) {
        this.csv(CSV_OPTIONS)
            .fromFile(file)
            .subscribe((line) => {
                // console.log(`line: ${JSON.stringify(line)}`)
                callback(line.destination, line.origin);
            })
    }

}

module.exports = new CSVProcessor();
