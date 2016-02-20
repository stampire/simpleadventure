var fs = require('fs');

var folder;
var name;

var processArguments = function(){
    // First two elements are "node" and "maker.js"
    process.argv.slice(2).forEach(function (arg, index) {
        folder = arg;
    });
    if ( !folder ){
        throw new Error('No folder supplied');
    }
    name = folder;
};
var readFile = function( file, callback ){
    fs = require('fs')
    return fs.readFileSync(file, 'utf8');

};
var writeOut = function(output){
    fs.writeFile("./" + name + "/" + name + ".html", output, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
};

processArguments();

var config      = require("./" + name + "/make.json"),
    width       = config.width || 1280,
    height      = config.height || 1024, 
    scenes      = config.scenes,
    stateBools  = {},
    header      = readFile("./dependencies/header.html"),
    uppermiddle = readFile("./dependencies/uppermiddle.html"),
    lowermiddle = readFile("./dependencies/lowermiddle.html"),
    footer      = readFile("./dependencies/footer.html");


var stageAndTitle = '<div id="stage"'
                        + 'style="width:'+ width +'px;'
                        + 'height:' + width + 'px;'
                        + 'background-image:url(\'./scenes/' + scenes[0].img + '\')'
                        + '"><h1>'+config.title+'</h1>';


var processScene = function(scene){
    gameScript += "function " + scene.id + "(){";
    gameScript += "cleanup();"
    gameScript += "$('#stage').css('background-image','url(\"./scenes/"+scene.img+"\")');"
    if (scene.text) {
        gameScript += "$('#narration').text('" + scene.text + "');"
        gameScript += "$('#narration').show();";
        gameScript += "$('#narration').css('top', '0px');"
        gameScript += "narrationUp = false;"
    }
    else {
        gameScript += "$('#narration').hide();";
    }

    for( var i in scene.objects ){
        var obj = scene.objects[i];
        if( (!obj.if || stateBools[obj.if]) && (!obj.unless || !stateBools[obj.unless])){
            gameScript += "$('<img>').addClass('object').attr('src', './objects/" + obj.img + "')";
            gameScript += ".css({" + (obj.x?"left:" + obj.x + ",":"")
                                   + (obj.y?"top:" + obj.y + ",":"")
                                   + (obj.width?"width:" + obj.width + ",":"") 
                                   + (obj.height?"height:" + obj.height + ",":"") 
                            +"})";
            gameScript += ".click("+obj.click+").appendTo('#stage');";
        }

    }

    gameScript += "}";
}

var gameScript = "function play() {";
gameScript += scenes[0].id + "()";
gameScript += "} ";

for(var scene in scenes){
    processScene(scenes[scene]);
}


fs.createReadStream('./dependencies/jquery-2.2.0.min.js')
    .pipe(fs.createWriteStream('./' + name + '/jquery-2.2.0.min.js'));

writeOut(header + config.title + uppermiddle + stageAndTitle + lowermiddle + gameScript + footer);