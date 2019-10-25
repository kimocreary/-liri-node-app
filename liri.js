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
        // console.log(data, "response from spotify api");
        for(let i = 0; i < data.tracks.items.length; i++){
            console.log("Album url:",data.tracks.items[i].album.href);
            console.log("Artist Name:",data.tracks.items[i].artists.map(allArtistName));
            console.log("album name:",data.tracks.items[i].album.name);
            console.log("Href:",data.tracks.items[i].preview_url || data.tracks.items[0].href);
            console.log(data.tracks.items[i].name);
        }
        
    }
    );
}
function movieTitle() {
    var searchMovie = searchString || "Mr. Nobody"
    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=full&tomatoes=true&apikey=trilogy"; 
    axios.get(queryUrl).then(function(response){
        // console.log(response.data)
        console.log("Title:",response.data.Title)
        console.log("Year:",response.data.Year)
        console.log("IMDB Rating:",response.data.imdbRating)
        console.log("Rotten Tomatoes Rating:",response.data.Ratings[1].Value)
        console.log("Country Where Movie Was Produced:",response.data.Country)
        console.log("Actors:",response.data.Actors)
        console.log("Plot:",response.data.Plot)
        console.log("********\n")
    })
}
function artistShowDetails() {
    var searchConcert = searchString || "Chris Brown"
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){
        console.log(response.data)
        for(var i=0; i<response.data.length; i++){
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            console.log(moment(response.data[i].datetime).format("MM/DD/YY"));
            console.log("********\n")
        }
        // response.data and navigate items
    })
}
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
function allArtistName(artist){
    return artist.name
}

