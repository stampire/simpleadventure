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
