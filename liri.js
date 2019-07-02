// ====== Make it so that liri.js can take in one of the following commands ====== //
// 1) spotify-this-song
// 2) do-what-it-says
// 3) conert-this
// 4) movie-this

// Code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config();

// // Import the keys.js file and store it in a variable:
var keys = require("./keys.js");

// =================== 1) SPOTIFY SEARCH ===================================== //
var Spotify = require("node-spotify-api");

// Access my Spotify API keys:
var spotify = new Spotify(keys.spotify);

// Setting the spotify.search as a fuction in global variable:
function spotfiySearch(query) {
  spotify.search({ type: "track", query }, function(err, response) {
    if (err) {
      return console.log("Connection error occurred: " + err);
    } else {
      // If the argument is undefined (i.e. If the user does not enter any song name...)
      if (!query) {
        // Output "The Sign" by The Ace of Base
        for (i = 0; i < response.tracks.items.length; i++) {
          // console.log(response.tracks.items[i].name);

          if (
            response.tracks.items[i].name == "The Sign" &&
            response.tracks.items[i].artists[0].name == "Ace of Base"
          ) {
            console.log(
              "Artist: " +
                response.tracks.items[i].artists[0].name +
                "\n" +
                "Song Title: " +
                response.tracks.items[i].name +
                "\n" +
                "A Preview Link of the Song from Spotify: " +
                response.tracks.items[i].external_urls.spotify +
                "\n" +
                "The Album: " +
                response.tracks.items[i].album.name
            );
            return;
          }
        }
      }

      // If the argument is defined (i.e. If the song name entered by the user is found)
      else {
        // console.log(response);

        // If there are no items found in the array of results output (i.e. No matching song found):
        if (response.tracks.total === 0) {
          console.log("Sorry, no song found!");
        } else {
          console.log(
            "Artist: " +
              response.tracks.items[0].artists[0].name +
              "\n" +
              "Song Title: " +
              response.tracks.items[0].name +
              "\n" +
              "A Preview Link of the Song from Spotify: " +
              response.tracks.items[0].external_urls.spotify +
              "\n" +
              "The Album: " +
              response.tracks.items[0].album.name
          );
        }
      }
    }
  });
}

// Conditions for search via terminal entry:
if (process.argv[2] === "spotify-this-song") {
    spotfiySearch(process.argv[3] ? process.argv[3] : "The Sign");

} else if (process.argv[2] === "do-what-it-says") {
    doWhatItSaysSearch();

} else if (process.argv[2] === "concert-this") {
    concertSerach(process.argv[3]);
}

// ================= 2) DO-WHAT-IT-SAYS SEARCH (from random.txt)=============== //
function doWhatItSaysSearch() {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var dataArr = data.split(",");
    // console.log(dataArr[0]); // Expected output: 'spotify-this-song'
    // console.log(dataArr[1]); // Expected output: whatever song name entered into the random.txt by the user.

    // Condition check to run different function based on the commands written:
    if (dataArr[0] === "spotify-this-song") {
      spotfiySearch(dataArr[1]);
      
    } else if (dataArr[0] === "concert-this") {
      concertSearch(dataArr[1]);

    } else if (dataArr[0] === "movie-this") {
      movieSearch(dataArr[1]);
    }
  });
}

// ===== 3) CONCERT SEARCH (via BandsInTown API)===== //
function concertSearch() {
    var Bandsintown = require('bandsintown')(APP_ID);
    var bandsintown = new Bandsintown(keys.bandsintown);
 
    bandsintown.getArtistEventList(query)
    .then(function(events) {
        console.log("Event list: " + events);
  });
};