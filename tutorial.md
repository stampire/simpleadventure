#SimpleAdventure Tutorial

We're going to make a REALLY simple game involving Kanye West. You can find all the code for this tutorial [in the sample directory](/sample).

##Before you start
Download the files from this Github repository. 

##Getting Started

The first thing we'll do is set up our game folder. Come up with a name for your app. This isn't the "TITLE"; this is just what the file is going to be called. Since this is a sample, we'll call ours `sample` (which isn't the best name, but it works).

We make a folder NEXT TO our `maker.js` file and call it the name we just came up with. For us that's `sample`. Inside that folder, make three folders `music`, `objects`, and `scenes`. These are where the images and music for our game will go. Finally, make a file called `make.json` and put it next to those folders. You should end up with a folder structure like this:
```
|--maker.js
|--sample
   |--music
   |--objects
   |--scenes
   |--make.json
```

Next, open up `make.json` using some kind of text editor. This is where we're going to define all the properties and rules for our game. In this file, put some open and close curly brackets (`{}`). Go ahead and put them each on their own line; putting things on new lines and separating things with tabs and spaces DOESN'T make a difference, so you can use lots of space to make your file easier to read. Inside these brackets, we're going to give our game a name, a height, and a width. We'll name our game "Sample Kanye Adventure!" because that's what it is. So inside our brackets we'll put `"title": "Sample Kanye Adventure!",`. 1280 by 1024 seems like  a solid resolution; it will fit on most screens and on larger screens will not require full screen mode. So put `"width": 1280,` and `"height": 1024` in there after the title. So far, your file should look something like this:

```
{
    "title": "Sample Kanye Adventure!",
    "width": 1280,
    "height": 1024
}
```
Some important things to note: all text is wrapped with double quotes. However, the numbers don't need quotes. Also, each property/line ends with a comma, except the last one. If you are missing commas or include a comma with the last one, it's not gonna work.

So now the game is going to start on a menu. It's going to say "Sample Kanye Adventure!" at the top and is going to be 1280 pixels by 1024 pixels. 

Finally, put `"scenes": []` at the end of your list with a few new lines inside those square brackets. Our definitions for our scenes will go in those. Your file should look like this now

```
{
    "title": "Sample Kanye Adventure!",
    "width": 1280,
    "height": 1024,
    "scenes": [

    ]
}
```

##Let's Make a Scene!

Let's put our first scene into the game. The first scene needs to be a "location" type (more on what this means in a bit). Our first scene is going to be a room in our house. Kanye is going to be in this room and there is going to be an arrow that takes us to a different location. 

Start off by putting some curly brackets inside the square brackets, just like we did at the beginning with the outer ones. Note that in JSON, something surrounded by curly brackets is called an **object**, and when you put `"something":"some value"` inside an object, it is said to have the **property** known as "something" and the value of that property is "some value". The way we actually say it is our object *has a "something" of "some value"*. I'm going to use that terminology for the rest of the tutorial.

EVERY scene needs an id, so let's give this one an id. It's the only room in our game, so let's call it "room". The ids can ONLY have letters, dashes, and underscores in them. They CANNOT have spaces. They also MUST be unique: no two scenes can have the same id. So give our scene object an `id` of `room` (remember, this means go into the curly brackets you made and put `"id": "room",`). Next, as I mentioned earlier, this is a "location" type scene. There are two types of scenes: locations and convos. So give it a `type` of `location`. 

Next, we need a background image. This image should be 1280 pixels by 1024 pixels since that's the size of our game and this is going to take up the whole screen. Another fun fact: since this is the first scene in our list (we will make a lot more as we go on), it is the first scene when the user hits "Play game". Also, the background of the start screen will be the background of this scene. I just found some random image of a room on the internet. I called it "room.jpg" and I put it in the "scenes" folder. Give the scene an `img` of `room.jpg`. The app will know to look in the "scenes" folder for scene background images. 

Next, we want to narrate our game, so we want to put some text at the top of the screen during this scene. This is optional; not every scene needs the narration text. However, this is the first level and it might be confusing what's going on, so let's explain it a bit to the player.

The player is at home, but Kanye is here, so let's something about that. Give it a property "text" with the value being whatever you want it to say at the top.

My JSON looks like this now

```
{
    "title": "Sample Kanye Adventure!",
    "width": 1280,
    "height": 1024,
    "scenes": [
        {
            "id": "room",
            "type": "location",
            "img": "room.jpg",
            "text": "You are in your home. Kanye West is here. As awesome as that sounds, you have things you need to do today..."
        }
}
```

However, I want to emphasize that it's **Kanye West**, so I can make it **bold** by wrapping it with underscores (`_Kanye West_`).

Our room has no stuff in it, so let's put stuff in it. Just like you did with the scenes in the outer object, give this object an `objects` property, but make the value square brackets (`[]`). More terminology: square brackets are "arrays". All our arrays are going to be arrays of objects, so they will have curly bracketed properties separated by commas. We are going to have two objects in our scene, Kanye's head and the arrow to move to the next area, so we're going to put two JSON objects in this objects array (separated by a comma). Aka

```
"options": [
    {
        ...stuff is going in here soon...
    },
    {
        ...here too...
    }
]
```

The first object will be Kanye. Objects need an image, a position, a size, and something to do when they're clicked on. I found a great gif of Kanye which I named "kanye.gif". I'm going to put that in my "objects" folder and I'm going to give the object an `img` of `kanye.gif`. You guessed it, the app will know to look in the objects folder for object images. I want this head to be in the upper left of the scene, so let's give the object an `x` of `200` and a `y` of 250. Remember, this point is where the UPPER LEFT corner of Kanye's head is going to go, not the center or something. Next, the image needs a size. The size is optional, but if we don't supply a size, it will just be the size of the image, which is too big. You can give an object in a scene a height, a width, or both. If you give it only a height or width, it will resize the entire image such that the height or width is what you specify. If you set both, it will set both to be exactly what you say, but that might distort the image if you don't use the correct proportions. I want the width of Kanye's head to be 300 pixels, and I want the game to figure out automatically how tall to make it, so let's give the object a `width` of `300`. Finally, when we click on Kanye's head, I want to start a conversation with Kanye. We have to define the conversation, but we can only do one thing at a time. It's a conversation with Kanye, and it's going to be first of a series of dialogs. So we'll call it `kanyeBegin`. Give your object a `click` of `kanyeBegin`. Later, we will make a scene with an id of `kanyeBegin`, and clicking on Kanye's head will start that scene (you see now why the ids have to be unique!).

The other object is an arrow to another scene. I got some clip art of a right facing arrow and named it "right.png". I'm gonna put that in my objects folder, put it on the right side of the screen and give it a width, just like we did with Kanye. For the click, I want the next scene to be a beach. We have to define that scene later, but in the meantime let's just give the object a `click` of `beach` and remember to make a beach scene later. 

This is what I ended up with for the objects array for the `room` scene:

```
"objects": [
                {
                    "img": "kanye.gif",
                    "x": 200,
                    "y": 250,
                    "width": 300,
                    "click": "kanyeBegin"
                },
                {
                    "img": "right.png",
                    "x": 1050,
                    "y": 400,
                    "width": 200,
                    "click": "beach"
                }
            ]
```

##Conversation

Let's make a conversation. A conversation is focused on an object, presents the player with some text, and then gives them some options of how to respond. 

In our JSON, a conversation is a scene just like a location, but it works a little differently. It goes in the same place, however. This is going to be the `kanyeBegin` conversation we referenced earlier when clicking on Kanye's head. So in the `scenes` array, after the `room` object, we're going to make a new one with an `id` of `kanyeBegin`. This time, however, it will have a `type` of `convo`. Convos work a little differently with the image. The image is the image of the *object* you are interacting with, not a scene background. This object will be put centered in the upper half of the screen, and the background will be the background of the previous location scene, but blurred out. We are talking to Kanye, so the image will be the same image, "kanye.gif". So give the object an `img` of `kanye.gif`. Next, again unlike the location scene, we need to specify a height and width. The game needs to know the height you want the object's head to be so it knows where put the text underneath so that they don't overlap. The width is necessary because the game needs it to properly center the image. Unfortunately, it cannot figure out the width automatically from the height. Anyway, I looked at the dimensions of the Kanye image and decided to give our object a `height` of 543 and a `width` of 402. Next, our convo scene needs text. This works just like the location text but isn't optional (this is a conversation, the other person needs to say something!). I'll have Kanye telling us how awesome he is and asking if we agree, because that seems realistic.

Next, we give our object `"options"` (not `objects`. Locations get `objects`, conversations get `options`). Options, like objects in the location scenes are arrays, so give it some square brackets. 

##Let's Put in Some Music

We want some music for this game. We want the music to start in the start menu and happen throughout the game. We want some main song to play during the menu and during the scenes, but when we enter into the conversation with Kanye, a different song should play.

I found [this awesome 8 bit Kanye song](https://www.youtube.com/watch?v=BhMK21LphSI) and downloaded it as an mp3 called "kanye.mp3". I'll put it in the "music" folder I'll put `"music":"kanye.mp3"` up at the top of our JSON next to where the height, width, and title are. The app will know to look in your music folder automatically for a file with the supplied name. The JSON at the top will now look like this

```
{
    "title": "Sample Kanye Adventure!",
    "width": 1280,
    "height": 1024,
    "music": "kanye.json",
    "scenes": [
        ...
    ]
}
```

This is the song that will play in the menu. This song will start automatically and loop forever until 1) the user hits the "Toggle Music" button in the main menu or 2) another song is started later in the game. 

I want this song to play throughout the game, but I want [a different song](https://www.youtube.com/watch?v=Ja1T3cFhw0U) to play when you talk to Kanye (I'm gonna call it "skinhead.mp3" FYI). 

You can put a `"music":"song.mp3"` in any scene. If that is the current song playing, it will continue to play it. If it isn't the current song, it will switch to that song. With that in mind, we need to think of where we'll need these properties. The only time the music isn't "kanye.mp3" is when we're talking to Kanye. Those are in his corresponding "convo" scenes. However, a conversation with Kanye *always* starts with `kanyeBegin`, which is triggered when we click on Kanye's head. All other dialog scenes come from options from this beginning one. Thus, if we start the "skinhead.mp3" in `kanyeBegin`, it will play during all convo scenes with Kanye so long as we don't include any music properties in them (if you want to be safe, you can just put a music property in every scene with the song you want to be playing, but that's more code you have to write). Now, when you talk to Kanye, it happens in the room. Leaving conversation with Kanye always ends up in the room. So the room scene is the only place we need to turn "kanye.mp3" back on. Note that neither the beach nor the pablo cd conversation require music properties. So I toss those into `room` and `kanyeBegin` and our music works just how we want!