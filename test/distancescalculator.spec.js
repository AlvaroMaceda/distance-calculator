'use strict';

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('Distances calculator', () => {

    beforeEach(function () {
        this.csvProcessor = require('../app/csvprocessor');
    });

    it('Calculates distances from a csv file with destinations', () => {

    });

    xit('Calculates distances from a csv file with destinations and origins', () => {

    });

    xit('Calculates a single distance', () => {

    });

    xit('', () => {

    });
});
