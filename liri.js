// Code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Import the keys.js file and store it in a variable:
var keys = require("./keys.js");

// Access my API keys:
var spotify = new spotify(keys.spotify);

// ...Make it so that liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
