// Code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config();

// Import the keys.js file and store it in a variable:
var keys = require("./keys.js");

// Access my API keys:
var spotify = new Spotify(keys.spotify);

spotify.search({tyoe: "track", query: "The Sign"}), function(err, response) {
    if (err) {
        return console.log("Error occurred: " + err);
    }

    this.then(function(response) {
    console.log(response);
    });

    this.catch(function(err) {
    console.log(err);
    });
};
    
    
// ...Make it so that liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


