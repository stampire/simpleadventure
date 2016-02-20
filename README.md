# Simple Adventure
Simple Adventure allows you to make a simple story and art based adventure game. You create a configuration file, provide the art, run this app and get your game.

## What kind of a game does this make?
Simple Adventure makes a really simple game. The game will be a series of rooms with objects in them. When the user clicks on an object, something happens. This something can either be a transition to another scene, initiation of a conversation, or the setting of a variable. These should be the only options necessary to make a simple interactive game

For instance, you can have a simple haunted house. You begin in a room with some spooky objects like a diary and a lever and a door. The user can click on the diary and the game starts a "conversation" with the diary. The conversation just consists of the "diary" saying one thing, which is whatever you want the player to know about the diary, and the player can have one option to respond, which is "leave". The user could click on the level, which could set a variable called "leverPulled" to true, and somewhere down the line, you can do something with that variable. The user could click on the door, and it could transition them to a different 'scene', which is really just a room. You provide the art and the rules and the game is made for you.

## How do I do it?

### Step 1: Get Art
Collect a bunch of image files to use in your game. You are going to need backgrounds, or "scenes", and characters, or "objects". 

Things to keep in mind:
 - You will need to provide things like doors or arrows for transitioning to different scenes.
 - Your scenes should all be the same size and shape. You will specify the height and width of your game. If your scenes aren't all the same size, it's going to look super weird.
 - Your files can be `.jpg`, `.png`, `.gif`, `.bmp`, or `.svg`. You CAN mix and match (you can have a few jpgs, a gif, an svg, and the rest pngs)
 - Your objects do NOT need to be the size you want them to be in game. You can specify what size you want them to be in the configuration file. However, the actual size of the image is its default value, so if you do not specify dimensions in the configuration file, the normal size will be used.

### Step 2: Set up your folder
Make a folder in the same place as this app (aka your `maker.js` file). Name the folder whatever you want the file for your game to be called. For our haunted house we could make it "haunted_house". Note that this is not the "name of your game", this is just for reference purposes, so keep it simple and make sure it's a legal file/folder name (remember, Microsoft Word is just "word.exe", Adobe Photoshop Pro CS6 is just "photoshop.exe"). Inside this folder, make two folders: "objects" and "scenes". Then, in the same folder make a file called "make.json". 

Recap: You have a folder called `your_game`. Inside are three items, two folders and a file, called `objects`, `scenes`, and `make.json`. 

Put all the scenes you got from Step 1 in the "scenes" folder and all the objects in the "objects" folder.

### Step 3: Make your configuration file
Open up `make.json` in some text editor like [Sublime Text](https://www.sublimetext.com/). This is where you define all the rules for your game. 

If you do not know what "JSON" means, scroll down to "I don't know what JSON means"

Your file MUST follow the following rules:

 - Your file is one big object. Inside that object are the following:
    - `title` STRING: what we're going to show on the start page.
    - `height` STRING: the height of your game. All your scene images should be this height.
    - `width`STRING:  the width of your game. All your scene images should be this width.
    - `scenes` LIST: contain only OBJECTS, each representing a scene in your game
        - Each `scene` is an OBJECT with the following properties:
            - `id` STRING: a UNIQUE identifier that you will use to reference your scenes.
            - `type` STRING: this is `"location"` if this is a location, or `"convo"` if this is a conversation
            - `img` STRING: this is the name of the image that will be used in this scene. If this is a `location`, this is the background image. We will look in your `scenes` folder for a file with this name. If this is a `convo`, then this is the object you are interacting with. The object will be in the center of the screen and the background will be the background of where the object was found but blurred out. We will look in your `objects` folder for a file with this name.
            - `text` STRING OPTIONAL: This is text that will appear at the top of the screen when the player enters the scene. This is OPTIONAL. If you don't include this property, we will just not show any text.
            - `objects` LIST: this is a list of the objects in your scene 

## I don't know what JSON means
[JSON](http://www.w3schools.com/json/json_syntax.asp) is format for laying out data that's easy for computer programs to understand. Computer programs are really good at understanding things that follow very specific rules, so JSON is a format that has very specific rules. You can learn about the format [here](http://www.w3schools.com/json/json_syntax.asp), or you can read the following rules. Note, however, that the following is not a complete or accurate description of the JSON format. Yet, it is all you need to know for Simple Adventure:
 - There are three "types": `object`, `list`, and `string`
 - A `string` is a collection of `characters`
    - Characters are anything you can make with your keyboard. These are all characters: abc123[{#@&*`~
    - A string in JSON is surrounded by quotes, so `"string"` and consist of any character you can make with your keyboard EXCEPT quotes (`"`) and the backslash (`\`).
        - If you NEED quotes or a backslash in your string, you can use `\"` and `\\`, respectively, and they will be replaced by a double quote symbol and a backslash, respectively.
    - Here are some examples of `strings`:
        - `"abc"`
        - `"1"`
        - `"I am a string"
        - `"I have some !@#$%^ crazy symbols"`
        - `"I have \"quotes\" in me"
 - A `list` is a collection of any number of the other types
    - A `list` can have `objects`, `strings` and even other `lists` inside
    - A `list` in JSON is surrounded by square brackets (`[]`) and the items are separated by commas
    - Here are some examples of `lists`:
        - `[]`
        - `["one item"]`
        - `["two items", "here's the other one"]`
        - `["list with lists", ["I'm a sub list", "I'm something else in the sublist"]]`
- An `object` is like a list, but each item gets a name.
    - The items in an `object` can be any of the other types, just like `lists`, and the item in an `object` can be another `object`
    - An `object` is surrounded by curly brackets (`{}`), and the items go "name" + ":" + "value" and are separated by commas.
    - The "name" MUST be a string and MUST be unique to that object.
        - an object cannot have items with the same name.
    - Here are some examples of `objects`:
        - `{}`
        - `{"name":"value"}`
        - `{"I":"am an object", "I have":"two items"}`
        - `{"colors":["red", "blue", "green"], "fruit":["apple", "orange", "lemon"]}`
- Spaces, tabs, and newlines do NOT matter unless they are inside of strings.
    - The following is legal in JSON
```
{
    "name": "value",
    "otherName": "otherValue",
    "list": [
        "value 1",
        "value 2",
        [
            "sublist",
            {
                "name": "subobject"
            }
        ]
    ]
}
```