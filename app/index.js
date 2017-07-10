console.log('Hello, World');

var argsParser = {
  parse: function(args) {
        console.log(args)
    }
};


try {
    argsParser.parse(process.argv);
}catch(e){

}