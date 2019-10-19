require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");


var spotify = new Spotify(keys.spotify);
// console.log(spotify);

let queryType = process.argv[2];

switch (queryType) {
    case "concert-this":
        let band = process.argv[3];
        getEvents(band);
        break;

    case "spotify-this-song":
        let input = process.argv;
        // console.log(input.length);
        // let songName = "The Sign"
        // if (input.length < 4) {
        //     getSong(songName);
        // };
        songName = input.slice(3).join(" ");
        getSong(songName);
        break;

    case "movie-this":

        break;

    case "do-what-it-says":

        break;
}

function getEvents(band) {
    let appID = "codingbootcamp";
    let queryURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=${appID}`;
    axios
        .get(queryURL)
        .then((response) => {
            let event = response.data
            event.forEach((element) => {
                console.log(element.venue.name);
                console.log(element.venue.city, element.venue.region);
                console.log(element.datetime);
            });
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
