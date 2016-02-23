'use strict';

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
        console.log("Game successfully generated as " + name + ".html");
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


var music = "";
if(config.music){
    music = "<audio id='audio' autoplay loop src='./music/"+config.music+"' style='display:none'></audio>"
}

var stageAndTitle = '<div id="stage"'
                        + 'style="width:'+ width +'px;'
                        + 'height:' + height + 'px;'
                        + 'background-image:url(\'./scenes/' + scenes[0].img + '\')'
                        + '"><h1>'+config.title+'</h1>';


var processScene = function(scene){
    gameScript += "function " + scene.id + "(){";
    gameScript += "cleanup();"

    if (scene.music){
        var musicLocation = "./music/" +  scene.music;
        gameScript += "if(musicOn && $('audio').attr('src') !== '"+musicLocation+"'){";
        gameScript += "$('audio').attr('src','"+musicLocation+"')";
        gameScript += "document.getElementById('audio').play()";
        gameScript += "}";
    }

    if(scene.music === ""){
        gameScript += "document.getElementById('audio').pause()";
    }

    // location mode
    if(scene.type === "location") {
        gameScript += "$('#stage').css('background-image','url(\"./scenes/"+scene.img+"\")');"
        if (scene.text) {
            var sceneText = scene.text.replace(/\*(.+?)\*/, "<em>$1</em>").replace(/_(.+?)_/, "<strong>$1</strong>");
            gameScript += "$('#narration').html('" + sceneText + "');";
            gameScript += "narrationRollDown();";
            gameScript += "$('#narration').show();";
        }
        else {
            gameScript += "$('#narration').hide();";
        }

        for( var i in scene.objects ){
            var obj = scene.objects[i];
            if (obj.if) {
                gameScript += "if(stateBools['"+obj.if+"']){";
            }
            if (obj.unless) {
                gameScript += "if(!stateBools['"+obj.unless+"']){";
            }
            gameScript += "$('<img>').addClass('object').attr('src', './objects/" + obj.img + "')";
            gameScript += ".css({" + (obj.x?"left:" + obj.x + ",":"")
                                   + (obj.y?"top:" + obj.y + ",":"")
                                   + (obj.width?"width:" + obj.width + ",":"") 
                                   + (obj.height?"height:" + obj.height + ",":"") 
                            +"})";
            if (obj.setTrue){
                gameScript += ".click(function(){stateBools['"+obj.setTrue+"'] = true;})"
            }
            if (obj.setFalse){
                gameScript += ".click(function(){stateBools['"+obj.setFalse+"'] = false;})"
            }
            gameScript += ".click("+obj.click+").appendTo('#stage');";
            if (obj.if || obj.unless) {
                gameScript += "}";
            }
        }
    }
    // Convo mode
    else {
        var objectHeight = (scene.height || 500) - 40,
            objectWidth = (scene.width || 500);
        gameScript += "$('#narration').hide();";
        gameScript += "$('<div>').addClass('blur').css('background-image', $('#stage').css('background-image')).appendTo('#stage');"
        gameScript += "$('<img>').addClass('object')";
        gameScript += ".attr('src', './objects/" + scene.img + "')";
        gameScript += ".css({'cursor':'auto','height':'"+objectHeight+"px','width':'"+objectWidth+"px', 'top':'20px', 'left':'"+((width - objectWidth)/2)+"px'})";
        gameScript += ".appendTo('#stage');";
        gameScript += "var ourConvo = $('<div>').addClass('convo')";
                                                // The 60 is for border/padding
        gameScript += ".css({'max-height':'"+(height - objectHeight - 60)+"px', 'top':'"+(scene.height || 500)+"px'});"
        
        var sceneText = scene.text.replace(/\*(.+?)\*/, "<em>$1</em>").replace(/_(.+?)_/, "<strong>$1</strong>");
        gameScript += "ourConvo.append($('<p>').html(\""+ sceneText+"\"));";
        gameScript += "var ourList = $('<ol>');";
        for(var i in scene.options){
            var option = scene.options[i];
            if (option.if) {
                gameScript += "if(stateBools['"+option.if+"']){";
            }
            if (option.unless) {
                gameScript += "if(!stateBools['"+option.unless+"']){";
            }

            var optionText = option.text.replace(/\*(.+?)\*/, "<em>$1</em>").replace(/_(.+?)_/, "<strong>$1</strong>");
            gameScript += "ourList.append($('<li>').html(\""+optionText+"\")";
            if (option.setTrue){
                gameScript += ".click(function(){stateBools['"+option.setTrue+"'] = true;})"
            }
            if (option.setFalse){
                gameScript += ".click(function(){stateBools['"+option.setFalse+"'] = false;})"
            }
            gameScript += ".click("+option.result+"));";
            if (option.if || option.unless) {
                gameScript += "}";
            }

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

writeOut(header + config.title + uppermiddle + music + stageAndTitle + lowermiddle + gameScript + footer);