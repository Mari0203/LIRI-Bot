// ====== Make it so that liri.js can take in one of the following commands ====== //
// 1) spotify-this-song
// 2) concert-this
// 3) movie-this
// 4) do-what-it-says

// Code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config();

// // Import the keys.js file and store it in a variable:
var keys = require("./keys.js");

// // To get the Node-Spotify module into the liri.js:
var Spotify = require('node-spotify-api');

// // Access my API keys:
var spotify = new Spotify(keys.spotify);

// Conditions for Spotify search:
if (process.argv[2] === "spotify-this-song" )  {
    spotify.search({type: "track", query: process.argv[3] ? process.argv[3] : "The Sign" }, function(err, response) {
        if (err) {
            return console.log("Error occurred: " + err);
        } else {
            // If the argument is undefined (i.e. If the user does not enter any song name...)
            if (!process.argv[3]) {

                // Output "The Sign" by The Ace of Base
                for (i = 0; i < response.tracks.items.length; i++) {
                    // console.log(response.tracks.items[i].name);
                
                    if (response.tracks.items[i].name == "The Sign" && response.tracks.items[i].artists[0].name == "Ace of Base") {
                        console.log(
                            "Artist: " + response.tracks.items[i].artists[0].name + "\n" +
                            "Song Title: " + response.tracks.items[i].name + "\n" +
                            "A Preview Link of the Song from Spotify: " + response.tracks.items[i].external_urls.spotify + "\n" +
                            "The Album: " + response.tracks.items[i].album.name
                        );
                        return
                    }
                };      
            }
            
        
            // If the argument is defined (i.e. If the song name entered by the user is found)
            else {
                // console.log(response);

                // If there are no items found in the array of results output (i.e. No matching song found):
                if (response.tracks.total === 0) {
                    console.log("Sorry, no song found!");
                } else {
                    console.log(
                        "Artist: " + response.tracks.items[0].artists[0].name + "\n" +
                        "Song Title: " + response.tracks.items[0].name + "\n" +
                        "A Preview Link of the Song from Spotify: " + response.tracks.items[0].external_urls.spotify + "\n" +
                        "The Album: " + response.tracks.items[0].album.name   
                    );
                }
            }      
             
        }
    });
};

