import csv from 'csvtojson'

const CSV_OPTIONS = {
    trim: true // This fails in some cases
};

class CSVProcessor {

    constructor() {
        this.csv =  csv
    }

    processFile(file, callback, _done, _error) {
        this.csv(CSV_OPTIONS)
            .fromFile(file)
            .subscribe((line) => {
                const { origin, destination, ...additionalFields } = line
                callback(destination, origin, additionalFields)
            })
    }

}

export default new CSVProcessor();
