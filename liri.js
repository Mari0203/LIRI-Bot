// ====== Make it so that liri.js can take in one of the following commands ====== //
// 1) spotify-this-song
// 2) concert-this
// 3) movie-this
// 4) do-what-it-says

// Code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config();

// Import the keys.js file and store it in a variable:
var keys = require("./keys.js");

// To get the Node-Spotify module into the liri.js:
var Spotify = require('node-spotify-api');

// Access my API keys:
var spotify = new Spotify(keys.spotify);



