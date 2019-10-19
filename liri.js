require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const  axios = require("axios");
const moment = require("moment");


var spotify = new Spotify(keys.spotify);

console.log(spotify);
