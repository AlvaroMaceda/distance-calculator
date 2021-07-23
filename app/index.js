#!/usr/bin/env node

const argsparser = require('./argsparser')
const csv = require('fast-csv')

try {
    argsparser.parse(process.argv);

    // console.log('origin: %s destination: %s key:%s',
    //     argsparser.arguments.origin, argsparser.arguments.destination, argsparser.arguments.key);
    // process.exit()

    let key = argsparser.arguments.key;
    let distancesCalculator = require('./distancescalculator')(key)

    const csvStream = csv.format({ headers: true, quote: '"' })
    csvStream.pipe(process.stdout)//.on('end', () => process.exit())

    distancesCalculator.processFile(
        argsparser.arguments.destinations,
        function(origin, destination, distance) {
            data = {
                origin: origin,
                destination: destination,
                ...distance
            }
            csvStream.write(data)
        },
        csvStream.end
    )

}catch(e){
    console.log(e)
}
