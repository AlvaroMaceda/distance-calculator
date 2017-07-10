#!/usr/bin/env node

argsparser = require('./argsparser');

try {
    argsparser.parse(process.argv);

    console.log('origin: %s destination: %s',
        argsparser.arguments.origin, argsparser.arguments.destination);

}catch(e){
    console.log(e);
}
