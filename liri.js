require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");

var spotify = new Spotify(keys.spotify);

let queryType = process.argv[2];
let query = process.argv.slice(3).join(" ");

runLIRI();

function runLIRI() {
    switch (queryType) {
        case "concert-this":
            getEvents(query);
            break;

        case "spotify-this-song":
            if (!query) query = "The Sign";
            getSong(query);
            break;

        case "movie-this":
            if (!query) query = "Mr. Nobody";
            getMovie(query);
            break;

        case "do-what-it-says":
            fs.readFile("./random.txt", "utf8", (err, data) => {
                if (err) throw err;
                queryType = data.split(",")[0];
                query = data.split(",")[1];
                runLIRI();
            });
            break;
    };
    let log = `${queryType} ${query}; `
    logCommand(log);
};

function getEvents(band) {
    let appID = keys.BandsInTown.appID;
    let queryURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=${appID}`;
    axios.get(queryURL).then((response) => {
            let event = response.data[1];
            let responseDate = event.datetime.split("T")[0];
            let momentDate = moment(responseDate, "YYYY-MM-DD");
            let date = moment(momentDate).format("MM/DD/YYYY");
            console.log(`
            Venue: ${event.venue.name}
            Location: ${event.venue.city}, ${event.venue.region}
            Date: ${date}`);
        })
        .catch((error) => {
            console.log(error);
        });
};

function getSong(songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log(err);
        };        
        let response = (data.tracks.items[0]);
        console.log(`
        Band/artist: ${response.artists[0].name}
        Song name: ${response.name}
        Album: ${response.album.name}
        Link: ${response.external_urls.spotify}`);
    });
};

function getMovie(movieName) {
    let title = movieName;
    let apiKEY = keys.OMDB.apiKEY;
    let queryURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKEY}&t=${title}`
    axios.get(queryURL).then((response) => {
            let result = response.data;
            console.log(`
            Title: ${result.Title}
            Release Year: ${result.Year}
            IMDB Rating: ${result.imdbRating}
            RT Rating: ${result.Ratings[1].Value}
            Country: ${result.Country}
            Languauge: ${result.Language}
            Plot: ${result.Plot}
            Actors: ${result.Actors}`);
        })
        .catch((err) => {
            console.log(err);
        })
};

function logCommand (log) {
    fs.appendFile("log.txt", log, (err) => {
        if (err) throw err;
    });
};