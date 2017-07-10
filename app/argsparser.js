/*
Note: There are no test of this module because
commander module kills the proccess if argument parsing is wrong.

Don't know how to test that.
 */

let ArgsParser = function() {

    let me = this;

    this.program = require('commander');
    this.arguments = {};

    this.program
        .arguments('<origin> <destination>')
        // .option('-u, --username <username>', 'The user to authenticate as')
        // .option('-p, --password <password>', 'The user\'s password')
        .action(function(origin, destination) {
            me.arguments.origin = origin;
            me.arguments.destination = destination;
        });
};


ArgsParser.prototype.parse = function (argv) {
    this.program.parse(argv);
};

ArgsParser.prototype.showHelp = function () {
    this.program.parse(['','','--help']);
};

module.exports = new ArgsParser();


