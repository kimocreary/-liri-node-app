require("dotenv").config();

var Spotify = require("node-spotify-api"); 
var keys = require("./keys"); 
var axios = require("axios"); 
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];
var searchString = process.argv.slice(3).join(" ") 
switch(command) {
    case "concert-this":
    artistShowDetails();
    break;
    case "spotify-this-song":
    songName();
    break;
    case "movie-this":
    movieTitle();
    break;
    case "do-what-it-says":
    executeCommand();
    break;
    default:
    console.log("Invalid Command")

}

function songName() {
    var searchSong = searchString || "The Sign by Ace of Base"
    spotify.search({
        type: "track",
         query: searchSong
    },function(error,data){
        if (error) throw error;
        console.log(data, "response from spotify api");
        console.log("album url:",data.tracks.items[1].album.href);
        console.log(data.tracks.items[1].artists[0].name);
        console.log("album name:",data.tracks.items[1].album.name);
        console.log(data.tracks.items[1].preview_url || data.tracks.items[0].href);
        console.log(data.tracks.items[1].name);
    }
    );
}
function movieTitle() {
    var searchMovie = searchString || "Armageddon"
    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=full&tomatoes=true&apikey=trilogy"; 
    axios.get(queryUrl).then(function(response){
        console.log(response.data)
    })
}

function artistShowDetails() {
    var searchConcert = searchString || "Chris Brown"
    console.log(searchConcert)
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){
        console.log(response)
       for (var i = 0; i < response.data.length; i++) { 
        // console.log(response.data)
        console.log(response.data[i].venue.name, 'venue name')
        console.log(response.data[i].venue.city, 'venue location')
       console.log(response.data[i].datetime, 'date of event')
       console.log("********\n")
        // response.data and navigate items
       };
    });
};

function executeCommand() {
    fs.readFile("random.txt","utf8",function(error,data){
        if (error) throw error;
        console.log(data);
        var dataarray = data.split(",");
        if (dataarray[0] === "spotify-this-song") {
            searchString = dataarray[1]
            songName();
        }
    })
}