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
        //'./test/fixtures/csvprocessor/TwoColumns2.csv',
        './temp/Test 1.csv',
        function(origin, destination, distance) {
            console.log(`origin: ${origin} destination: ${destination}`);
            console.log('distance:' + JSON.stringify(distance));
        },
        function() { console.log('done')}
    )

}catch(e){
    console.log(e);
}
