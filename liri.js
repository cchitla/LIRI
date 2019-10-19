require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");

var spotify = new Spotify(keys.spotify);

let input = process.argv;
let queryType = input[2];

switch (queryType) {
    case "concert-this":
        let band = process.argv[3];
        getEvents(band);
        break;

    case "spotify-this-song":
        songName = input.slice(3).join(" ");
        getSong(songName);
        break;

    case "movie-this":
        movieName = input.slice(3).join(" ");
        getMovie(movieName);
        break;

    case "do-what-it-says":

        break;
};

function getEvents(band) {
    let appID = "codingbootcamp";
    let queryURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=${appID}`;
    axios
        .get(queryURL)
        .then((response) => {
            let event = response.data[1];
            console.log(`Venue: ${event.venue.name}`);
            console.log(`Location: ${event.venue.city, event.venue.region}`);
            console.log(`Date: ${event.datetime}`);
            console.log("=============");
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
        console.log("Band/artist:", response.artists[0].name);
        console.log("Song name:", response.name);
        console.log("Album:", response.album.name);
        console.log("Link:", response.external_urls.spotify);
    });
};

function getMovie(movieName) {
    let title = movieName
    let apiKEY = "2625b914"
    let queryURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKEY}&t=${title}`
    axios
        .get(queryURL)
        .then((response) => {
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