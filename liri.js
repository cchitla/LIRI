require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");


var spotify = new Spotify(keys.spotify);
// console.log(spotify);

let queryType =process.argv[2];

switch (queryType) {
    case "concert-this":
        let band = process.argv[3];
        console.log(band);
        getEvents(band);
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
