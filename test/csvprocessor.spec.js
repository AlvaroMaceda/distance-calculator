'use strict';

const expect = require('chai').expect;
const csv = require('csvtojson');
const util = require('util');

const options = {
    noheader:true,
    headers: ['destination','origin'],
    trim: true, // This fails in some cases
};

describe('csv Processor', () => {

    it('Works with one column', function() {

    });

    it('Works with two columns (destination and origin)', function() {

    });

    it('Fails with more than two columns', function() {

    });

    it('Does something', function() {

        const csvFilePath = './test/fixtures/test1.csv';

        csv(options)
            .fromFile(csvFilePath)
            .on('json', (line) => {
                console.log(util.inspect(line));
            })
            .on('done',(error)=>{
                console.log('end ' + error)
            })

    });

});