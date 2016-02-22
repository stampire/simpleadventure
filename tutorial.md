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

Start off by putting some curly brackets inside the square brackets, just like we did at the beginning with the outer ones. EVERY scene needs an id, so let's give this one an id. It's the only room in our game, so let's call it "room". The ids can ONLY have letters, dashes, and underscores in them. They CANNOT have spaces. They also MUST be unique: no two scenes can have the same id. So put `"id": "room",` in the brackets. Next, as I mentioned earlier, this is a "location" type scene. There are two types of scenes: locations and convos. So we throw in a `"type": "location",`. 

Next, we need a background image. This image should be 1280 pixels by 1024 pixels since that's the size of our game and this is going to take up the whole screen. Another fun fact: since this is the first scene in our list (we will make a lot more as we go on), it is the first scene when the user hits "Play game". Also, the background of the start screen will be the background of this scene. I just found some random image of a room on the internet. I called it "room.jpg" and I put it in the "scenes" folder. Throw in `"img": "room.jpg",` after the type. The app will know to look in the "scenes" folder for scene background images. 

Next, we want to narrate our game, so we want to put some text at the top of the screen during this scene. This is optional; not every scene needs the narration text. However, this is the first level and it might be confusing what's going on, so let's explain it a bit to the player.

The player is at home, but Kanye is here, so let's something about that. 

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
            "text": "You are in your home. Kanye West is here. As awesome as that sounds, you have things you need to do today...",
        }
}
```

However, I want to emphasize that it's **Kanye West**, so I can make it **bold** by wrapping it with underscores (`_Kanye West_`).

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