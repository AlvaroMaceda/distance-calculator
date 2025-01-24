#!/usr/bin/env node

import argsparser from './argsparser.js';
import csv from 'fast-csv'
import distancesCalculatorLib from './distancescalculator.js'

try {
    argsparser.parse(process.argv);

    let key = argsparser.arguments.key;
    let distancesCalculator = distancesCalculatorLib(key)

    const csvStream = csv.format({ headers: true, quote: '"' })
    csvStream.pipe(process.stdout)

    distancesCalculator.processFile(
        argsparser.arguments.file,
        function(origin, destination, additionalFields, distance) {
            const data = {
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
