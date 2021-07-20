#!/usr/bin/env node

const argsparser = require('./argsparser');
const csvProcessor = require('../app/csvprocessor');
const FIXTURES_PATH = './test/fixtures/';

try {
    argsparser.parse(process.argv);

    console.log('origin: %s destination: %s key:%s',
        argsparser.arguments.origin, argsparser.arguments.destination, argsparser.arguments.key);

    let key = argsparser.arguments.key;

    let distancesCalculator = require('./distancescalculator')(key);
    distancesCalculator.processFile(
        // './test/fixtures/csvprocessor/OneColumn2.csv',
        './test/fixtures/csvprocessor/TwoColumns2.csv',
        function(foo) {
            console.log('foo:' + foo);
        },
        function() { console.log('done')}
    )

}catch(e){
    console.log(e);
}
