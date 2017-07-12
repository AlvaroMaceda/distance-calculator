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
            .arguments('<origin> <destination> <key>')
            // .option('-u, --username <username>', 'The user to authenticate as')
            // .option('-p, --password <password>', 'The user\'s password')
            .action(function(origin, destination, key) {
                me.arguments.origin = origin;
                me.arguments.destination = destination;
                me.arguments.key = key;
            });
    }

    parse(argv) {
        this.program.parse(argv);
    }

}

module.exports = new ArgsParser();


