#!/usr/bin/env node

const argsparser = require('./argsparser')
const csv = require('fast-csv')

try {
    argsparser.parse(process.argv);

    let key = argsparser.arguments.key;
    let distancesCalculator = require('./distancescalculator')(key)

    const csvStream = csv.format({ headers: true, quote: '"' })
    csvStream.pipe(process.stdout)

    distancesCalculator.processFile(
        argsparser.arguments.file,
        function(origin, destination, additionalFields, distance) {
            data = {
                origin: origin,
                destination: destination,
                ...(additionalFields || {}),
                ...distance
            }
            csvStream.write(data)
        },
        csvStream.end
    )

}catch(e){
    console.log(e)
}
