#!/usr/bin/env node

import argsparser from './argsparser.js';
import csv from 'fast-csv'
import DistancesCalculator from './distancescalculator.js'

try {
    argsparser.parse(process.argv);
    let { key, mode, origin, file  } = argsparser.arguments;

    let calculator = new DistancesCalculator(key, mode, origin);

    const csvStream = csv.format({ headers: true, quote: '"' })
    csvStream.pipe(process.stdout)

    calculator.processFile(
        file,
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
