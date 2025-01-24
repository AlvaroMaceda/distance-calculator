/*
Note: There are no test of this module because
'commander' module kills the proccess if argument parsing is wrong.

Don't know how to test that.
 */

import { program } from 'commander'

class ArgsParser {

    constructor() {
        let me = this

        this.program = program
        this.arguments = {}

        this.program
            // TO-DO: Add origin option
            // .option('-o, --origin <text>', 'Text with the origin position')
            .requiredOption('-f, --file <file>', 'CSV with the destinations')
            .requiredOption('-k, --key <key>', 'Google distance matrix key')
            .action(function() {
                const { origin, file, key } = this.opts()
                me.arguments.origin = origin
                me.arguments.file = file
                me.arguments.key = key
            })
            .usage("dcalculator --key 'your Google's distance matrix key here' --file 'path_of_destinations_file'")
            .help()
    }

    parse(argv) {
        this.program.parse(argv)
    }

}

export default new ArgsParser()


