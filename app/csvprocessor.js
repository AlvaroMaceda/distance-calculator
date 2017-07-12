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
            .on('json', (line) => {
                callback(line.destination, line.origin);
            })
            .on('done',()=>{
                if(done instanceof Function) done();
            })
            .on('error', (err) => {
                if(error instanceof Function) error(err);
                else throw err;
            });
    }

}

module.exports = new CSVProcessor();