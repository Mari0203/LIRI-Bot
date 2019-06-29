# HW8: LIRI-Bot (w/ Node.js)

## App Overview
This app utilizes *Language Interpretation and Recognition Interface (LIRI)* in the form of CLI (*Command Line Interface*) app with Node.js which searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.  With this app, the user can obtain these data in the desired, complied output format from one single interface (via CLI) without having to carry out searches on different websites.

## How App is Organized
blah blah blah...

## Getting Started: How To Use the App
1.
2.
3.

## App Demo Files
* Screenshots:
* Gifs:
* Video Recording:

## Link to Deployed Version of the App:
Link goes here like below...
http://github.com - automatic!
[GitHub](http://github.com)

## Technologies Used
* JavaScript
* Node.js
* Node packages (Node-Spotify-API, Axios, Moment, and DotEnv)
* APIs (from Spotify, Bands in Town, and OMDB)

## My Role
Unicorn Powerrrrrrrrr!

## App Requirements
The app will use the text in `random.txt` file to call one of LIRI-Bot's commands. For example, it will run `spotify-this-song` command when the text in `random.txt` is "I Want it That Way".

### Getting Data from SPOTIFY:

1. User can enter name of a song to get following information about the song:
    * Artist(s)
    * The song title
    * Preview link of the song from Spotify
    * The album name

2. If no song is provided, then the app will default to presenting "The Sign" by Ace of Base as output.

### Getting Data from BANDS IN TOWN:

1. User can enter an artist (or a band)'s name to get following detail of that artist's concert event:
    * Name of the venue
    * Venue location
    * Date of the event in the MM/DD/YYYY format
    
2. If no event is found, signal the user as so.

### Getting Data from OMDB:

1. User can enter the title of a movie to get following information about that movie:
    * Title
    * Release Year
    * IMDB Rating
    * Rotten Tomatoes Rating
    * Country in which the movie was produced
    * Original Language
    * Plot
    * Casts

2. If the user does not enter a movie name, the app will out put the data for the movie, 'Mr. Nobody' as default.

 
Created by Mari
with :v:  &  :green_heart:
