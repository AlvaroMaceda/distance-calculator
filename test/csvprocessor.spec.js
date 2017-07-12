'use strict';

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const csv = require('csvtojson');
const util = require('util'); // Remove when testing done

const FIXTURES_PATH = './test/fixtures/csvprocessor/';
const csvProcessor = require('../app/csvprocessor');

describe('csv Processor', () => {

    let csvProcessor;

    beforeEach( function() {
        csvProcessor = require('../app/csvprocessor');
    });

    it('Works with one column (destination)', function(done) {
        let spy1 = sinon.spy();

        let expectation  = function() {
            expect(spy1).to.have.been.calledWith('221B Baker Street, London');
            done();
        };

        csvProcessor.processFile(FIXTURES_PATH + 'OneColumn1.csv', spy1, expectation);

        let spy2 = sinon.spy();
        expectation  = function() {
            expect(spy2).to.have.been.calledThrice();
            done();
        };
        csvProcessor.processFile(FIXTURES_PATH + 'OneColumn2.csv', spy2, expectation);

    });

    it('Works with two columns (destination and origin)', function(done) {

        let spy1 = sinon.spy();

        let expectation  = function() {
            expect(spy1).to.have.been.calledWith("Capsule Corp.", "WST 3338926 K");
            done();
        };

        csvProcessor.processFile(FIXTURES_PATH + 'TwoColumns1.csv', spy1, expectation);

        let spy2 = sinon.spy();
        expectation = function() {
            expect(spy2.callCount()).to.equal(5);
            done();
        };
        csvProcessor.processFile(FIXTURES_PATH + 'TwoColumns2.csv', spy2, expectation);
    });

    it('Works with the two first columns if there are more than two ones', function() {
        let spy = sinon.spy();
        let expectation = function() {
            expect(spy.callCount()).to.equal(5);
            done();
        };
        csvProcessor.processFile(FIXTURES_PATH + 'MoreThanTwoColumns.csv', spy, expectation);
    });

    xit('Works with mixed number of columns', function() {

    });

    it('Fails if file does not exists', function(done) {
        csvProcessor.processFile('nonExistentFile.csv', function () {}, function() {},
            function(error) {
                if(error.message === 'File not exists') done();
                else done('Expected file not exists message');
            });
    });

});