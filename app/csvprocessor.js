'use strict';

class CSVProcessor {

    constructor() {
    }

    processFile(file, callback) {
        throw new Error('File does not exists');
    }

}

module.exports = new CSVProcessor();