'use strict';
const util = require('util'); // Remove when testing done

const CSV_OPTIONS = {
    noheader:true,
    headers: ['destination','origin'],
    trim: true, // This fails in some cases
};

class CSVProcessor {

    constructor() {
        this.csv =  require('csvtojson');
    }

    processFile(file, callback, done) {

        this.csv(CSV_OPTIONS)
            .fromFile(file)
            .on('json', (line) => {
                callback(line.destination); //, line.origin);
            })
            .on('done',(error)=>{
                if(error) throw new Error(error);
                done();
            })

    }

}

module.exports = new CSVProcessor();