'use strict';

const expect = require('chai').expect;
const csv = require('csvtojson');
const util = require('util');
const csvProcessor = require('../app/csvprocessor');

const options = {
    noheader:true,
    headers: ['destination','origin'],
    trim: true, // This fails in some cases
};

describe('csv Processor', () => {

    beforeEach( function() {
        this.csvProcessor = require('../app/csvprocessor');
    });

    it('Works with one column (destination)', function(done) {
        this.csvProcessor.processFile('fixtures/OneColumn.csv', function () {});
    });

    it('Works with two columns (destination and origin)', function(done) {
        this.csvProcessor.processFile('fixtures/TwoColumn.csv', function () {});
    });

    it('Fails with more than two columns', function() {
        expect( () => {
            this.csvProcessor.processFile('fixtures/ThreeColumn.csv', function () {});
        }).to.throw(Error,'Incorrect number of columns');
    });

    it('Fails if file does not exists', function() {
        expect( () => {
            this.csvProcessor.processFile('nonExistentFile.csv', function () {});
        }).to.throw(Error,'File does not exists');
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