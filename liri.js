require("dotenv").config();
var Spotify = require("node-spotify-api"); 
var keys = require("./keys"); 
var axios = require("axios"); 
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
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
        console.log(data, "response from spotify api")
    }
    );
}
function movieTitle() {
    var searchMovie = searchString || "The Sign by Ace of Base"
    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=full&tomatoes=true&apikey=trilogy"; 
    axios.get(queryUrl).then(function(response){
        console.log(response.data)
    })
}
function artistShowDetails() {
    var searchConcert = searchString || "Chris Brown"
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){
        console.log(response.data)
    })
}