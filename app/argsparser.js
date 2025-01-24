/*
Note: There are no test of this module because
'commander' module kills the proccess if argument parsing is wrong.

Don't know how to test that.
 */

import { program, Option } from 'commander'

const USAGE_TEXT = "dcalculator " +
    "--key 'your Google's distance matrix key here' " +
    "--file 'path_of_destinations_file' " +
    "[--mode 'driving|walking|bicycling|transit'] " +
    "[--origin 'origin position']"


class ArgsParser {

    constructor() {
        let me = this

        this.program = program
        this.arguments = {}

        this.program
            .requiredOption('-f, --file <file>', 'CSV with the destinations')
            .requiredOption('-k, --key <key>', 'Google distance matrix key')
            .option('-o, --origin <text>', 'Text with the origin position')
            .addOption(new Option('-m, --mode <mode>', 'Mode of transport').choices(['driving', 'walking', 'bicycling', 'transit']))
            .action(function () {
                const { origin, file, key, mode } = this.opts()
                me.arguments.origin = origin
                me.arguments.file = file
                me.arguments.key = key
                me.arguments.mode = mode || 'driving'
            })
            .usage(USAGE_TEXT)
            .helpOption(true)
    }

    parse(argv) {
        this.program.parse(argv)
    }
    
}

export default new ArgsParser()


