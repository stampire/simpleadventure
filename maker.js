var file;
var name;

var processArguments = function(){
    // First two elements are "node" and "maker.js"
    process.argv.slice(2).forEach(function (arg, index) {
        file = arg;
    });
    if ( !file ){
        throw new Error('No folder supplied');
    }
    name = file.split(".")[0];
};

var readFile = function( callback ){
    fs = require('fs')
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        code = data;
        callback();
    });
};


processArguments();

readFile( function () {
    console.log(name);
    console.log(file);
});
