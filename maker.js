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
    header      = readFile("./dependencies/header.html"),
    uppermiddle = readFile("./dependencies/uppermiddle.html"),
    lowermiddle = readFile("./dependencies/lowermiddle.html"),
    footer      = readFile("./dependencies/footer.html");


var stageAndTitle = '<div id="stage"'
                        + 'style="width:'+ width +'px;'
                        + 'height:' + height + 'px;'
                        + 'background-image:url(\'./scenes/' + scenes[0].img + '\')'
                        + '"><h1>'+config.title+'</h1>';


var processScene = function(scene){
    gameScript += "function " + scene.id + "(){";
    gameScript += "cleanup();"

    // location mode
    if(scene.type === "location") {
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
            gameScript += "$('<img>').addClass('object').attr('src', './objects/" + obj.img + "')";
            gameScript += ".css({" + (obj.x?"left:" + obj.x + ",":"")
                                   + (obj.y?"top:" + obj.y + ",":"")
                                   + (obj.width?"width:" + obj.width + ",":"") 
                                   + (obj.height?"height:" + obj.height + ",":"") 
                            +"})";
            gameScript += ".click("+obj.click+").appendTo('#stage');";
        }
    }
    // Convo mode
    else {
        var objectHeight = scene.height - 40;
        gameScript += "$('#narration').hide();";
        //gameScript += "$('#stage').css('background-image','url(\"./scenes/"+scene.background+"\")')";
        gameScript += "$('<div>').addClass('blur').css('background-image', $('#stage').css('background-image')).appendTo('#stage');"
        gameScript += "$('<img>').addClass('object')";
        gameScript += ".attr('src', './objects/" + scene.img + "')";
        gameScript += ".css({'cursor':'auto','height':'"+objectHeight+"px','width':'"+scene.width+"px', 'top':'20px', 'left':'"+((width - scene.width)/2)+"px'})";
        gameScript += ".appendTo('#stage');";
        gameScript += "var ourConvo = $('<div>').addClass('convo')";
                                                // The 60 is for border/padding
        gameScript += ".css({'max-height':'"+(height - objectHeight - 60)+"px', 'top':'"+(scene.height)+"px'});"
        gameScript += "ourConvo.append($('<p>').html(\""+ scene.text+"\"));";
        gameScript += "var ourList = $('<ol>');";
        for(var i in scene.options){
            var option = scene.options[i];
            gameScript += "ourList.append($('<li>').html(\""+option.text+"\").click("+option.result+"));";
        }
        gameScript += "ourList.appendTo(ourConvo);"
        gameScript += "ourConvo.appendTo('#stage');";
    }

    gameScript += "}";
}

var gameScript = "var stateBools = {}; function play() {";
gameScript += scenes[0].id + "()";
gameScript += "} ";

for(var scene in scenes){
    processScene(scenes[scene]);
}


fs.createReadStream('./dependencies/jquery-2.2.0.min.js')
    .pipe(fs.createWriteStream('./' + name + '/jquery-2.2.0.min.js'));

writeOut(header + config.title + uppermiddle + stageAndTitle + lowermiddle + gameScript + footer);