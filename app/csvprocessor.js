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

    processFile(file, callback, done, error) {

        this.csv(CSV_OPTIONS)
            .fromFile(file)
            .on('json', (line) => {
                callback(line.destination, line.origin);
            })
            .on('done',()=>{
                done();
            })
            .on('error', (err) => {
                console.log('Errorl jander:' +util.inspect(error));
                if(error instanceof Function) error(err);
                else throw error;
            });
    }

}

module.exports = new CSVProcessor();