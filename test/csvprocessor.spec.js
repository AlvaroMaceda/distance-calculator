'use strict';

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const csv = require('csvtojson');
const util = require('util'); // Remove when testing done

const FIXTURES_PATH = './test/fixtures/';
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
        let spy1 = sinon.spy();

        let expectation  = function() {
            expect(spy1).to.have.been.calledWith('221B Baker Street, London');
            done();
        };

        this.csvProcessor.processFile(FIXTURES_PATH + 'OneColumn1.csv', spy1, expectation);

        let spy2 = sinon.spy();
        expectation  = function() {
            expect(spy2).to.have.been.calledThrice();
            done();
        };
        this.csvProcessor.processFile(FIXTURES_PATH + 'OneColumn2.csv', spy2, expectation);

    });

    xit('Works with two columns (destination and origin)', function(done) {
        this.csvProcessor.processFile(FIXTURES_PATH + 'TwoColumn.csv', function () {});
    });

    xit('Fails with more than two columns', function() {
        expect( () => {
            this.csvProcessor.processFile(FIXTURES_PATH + 'ThreeColumn.csv', function () {});
        }).to.throw(Error,'Incorrect number of columns');
    });

    xit('Fails if file does not exists', function() {
        expect( () => {
            this.csvProcessor.processFile('nonExistentFile.csv', function () {});
        }).to.throw(Error,'File does not exists');
    });


    xit('Does something', function() {

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