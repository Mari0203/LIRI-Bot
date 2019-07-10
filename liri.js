// Code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config();

// Global variables:
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");

// Access my Spotify API keys:
var spotify = new Spotify(keys.spotify);

 
// =================================================================================== //
// ========== Conditions for search via terminal entry =============================== //
// =================================================================================== //
// Make it so that liri.js can take in one of the following commands:
// 1) spotify-this-song
// 2) do-what-it-says
// 3) conert-this
// 4) movie-this

if (process.argv[2] === "spotify-this-song") {
  var input= process.argv[3] != undefined ? process.argv.slice(3).join(" ") : "The Sign";
  spotfiySearch(input);
} else if (process.argv[2] === "do-what-it-says") {
  doWhatItSaysSearch();
} else if (process.argv[2] === "concert-this") {
  concertSearch(process.argv[3]);
} else if (process.argv[2] === "movie-this") {
  movieSearch(process.argv.slice(3).join(" "));
}

// =================================================================================== //
// ========== 1) SPOTIFY SEARCH ====================================================== //
// =================================================================================== //
function writeLogs(data){
  fs.writeFile("log.txt", data, function(err) {
 
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  });
 }

function spotfiySearch(userInput) {
  console.log(userInput);

 
  spotify.search({ type: "track", query: userInput, limit: 5}, function(err, response) {
    if (err) {
      return console.log("Connection error occurred: " + err);
    } else {
      // If the argument is UNDEFINED (i.e. If the user does not enter any song name...)
      if ( userInput== "The Sign" ) {
        // Output "The Sign" by The Ace of Base
        writeLogs( JSON.stringify(response,null,2 ))

        console.log(
          "------------------------------------\n",
          "Artist....: " + response.tracks.items[4].artists[0].name + "\n" +
          "Song Title: " + response.tracks.items[4].name + "\n" +
          "A Preview Link of the Song from Spotify: " + response.tracks.items[4].external_urls.spotify + "\n" +
          "The Album: " + response.tracks.items[4].album.name + "\n" +
          "------------------------------------\n",
        );
      
      }
      else{ 
        for (var i = 0; i < response.tracks.items.length; i++) {
         
     
            console.log(
              "------------------------------------\n",
              "Artist for loop: " + response.tracks.items[i].artists[0].name + "\n" +
              "Song Title: " + response.tracks.items[i].name + "\n" +
              "A Preview Link of the Song from Spotify: " + response.tracks.items[i].external_urls.spotify + "\n" +
              "The Album: " + response.tracks.items[i].album.name,
              "------------------------------------\n",
            );
          
           
        }

        if (response.tracks.items.length=== 0) {
          console.log("Sorry, no song found!");
        }
      }
    }
  });
}

// =================================================================================== //
// ========== 2) DO-WHAT-IT-SAYS SEARCH (from random.txt) ============================ //
// =================================================================================== //

function doWhatItSaysSearch() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var dataArr = data.split(", ");
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

// =================================================================================== //
// ============ 3) CONCERT SEARCH (via BandsInTown API) ============================== //
// =================================================================================== //

function concertSearch() {
  var artist = process.argv[3];
  var urlBIT =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(urlBIT).then(function(response) {
    console.log(
      "------------------------------------\n",
      "Venue Name: " + response.data[0].venue.name + "\n",
      "Location: " + response.data[0].venue.city + "\n",
      "Date of the Event: " +
        moment(response.data[0].datetime).format("L") +
        "\n",
      "------------------------------------\n"
    );
  });
}

// =================================================================================== //
// ========== 4) MOVIE SEARCH (via OMDB API) ========================================= //
// =================================================================================== //

function movieSearch(movieName) {
  // Access OMBD API via axios package with a specified movie name
  var urlOMDB =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // console.log("test..")

  axios.get(urlOMDB).then(function(response) {
    // If the user does NOT enter a movie name...
    if (response.data.Title === undefined) {
      console.log("No movie name was entered... So here's the default:");

      // Display movie info on "Mr. Nobody" as the default output:
      urlOMDB =
        "http://www.omdbapi.com/?t=" +
        "Mr. Nobody" +
        "&y=&plot=short&apikey=trilogy";
      axios.get(urlOMDB).then(function(response) {
        console.log(
          "------------------------------------\n",
          "Movie Title: " + response.data.Title + "\n",
          "Release Year: " + response.data.Released + "\n",
          "IMDB Rating: " + response.data.imdbRating + "\n",
          "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n",
          "Production Country: " + response.data.Country + "\n",
          "Original Language: " + response.data.Language + "\n",
          "Plot: " + response.data.Plot + "\n",
          "Casts: " + response.data.Actors + "\n",
          "------------------------------------\n"
        );
      });
    } else if (response.data === 0) {
      console.log("Sorry, no movie found!");
    } else {
      var resultPartA =
        "------------------------------------\n" +
        "Movie Title: " +
        response.data.Title +
        "\n" +
        "Release Year: " +
        response.data.Released +
        "\n" +
        "IMDB Rating: " +
        response.data.imdbRating +
        "\n";

      /* Defining 'if' condition below to include Rotten Tomatoes Rating value if the response output
         is defined (i.e. "not UNdefined") within this 'else' statement because
         as some of the movies do not have Rottten Tomatoes Ratings available: */
      if (response.data.Ratings[1] != undefined) {
        result =
          resultPartA +
          "Rotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
          "\n" +
          "Production Country: " +
          response.data.Country +
          "\n" +
          "Original Language: " +
          response.data.Language +
          "\n" +
          "Plot: " +
          response.data.Plot +
          "\n" +
          "Casts: " +
          response.data.Actors +
          "\n" +
          "------------------------------------\n";
      }
      console.log(result);
      logText(result);
    }
  });
}

// =================================================================================== //
// ======== BONUS: Append data into Log.txt ========================================== //
// =================================================================================== //
function logText(query) {
  fs.appendFile("log.txt", query, function(err) {
    if (err) throw err;
    console.log("--- Data was logged in log.txt! ---");
  });
}
