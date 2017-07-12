#!/usr/bin/env node

const argsparser = require('./argsparser');
const csvProcessor = require('../app/csvprocessor');
const FIXTURES_PATH = './test/fixtures/';

try {
    argsparser.parse(process.argv);

    console.log('origin: %s destination: %s',
        argsparser.arguments.origin, argsparser.arguments.destination);

    cb = function() { console.log('calling cb'); };
    done = function() { console.log('calling done'); };
    csvProcessor.processFile(FIXTURES_PATH + 'OneColumn1.csv', cb, done);

}catch(e){
    console.log(e);
}
