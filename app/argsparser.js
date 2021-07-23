/*
Note: There are no test of this module because
'commander' module kills the proccess if argument parsing is wrong.

Don't know how to test that.
 */
class ArgsParser {

    constructor() {
        let me = this;

        this.program = require('commander');
        this.arguments = {};

        this.program
            .requiredOption('-o, --origin <text>', 'Text with the origin position')
            .requiredOption('-d, --destinations <file>', 'CSV with the destinations')
            .requiredOption('-k, --key <key>', 'Google distance matrix key')
            .action(function() {
                const { origin, destinations, key } = this.opts()
                me.arguments.origin = origin;
                me.arguments.destinations = destinations;
                me.arguments.key = key;
            });
    }

    parse(argv) {
        this.program.parse(argv);
    }

}

module.exports = new ArgsParser();


