# LIRI

LIRI is a CLI program that will take in user input to get information on a song, a movie, or the next upcoming event for a band or artist.

**Installation and setup**

After installing NPM packages, the user will need to create a .env file to store their personal API keys for Spotify, Bands in Town, and OMDB. 

<img src="/images/userkeys.png" width="250">


**Using LIRI**

LIRI will take in 4 different commands: 
* concert-this __band/artist name__
* spotify-this-song __song name__
* movie-this __movie name__
* do-what-it-says

The commands must have a dash instead of spaces; the user query allows spaces. The do-what-it-says command will read a txt file and use data stored there to make a search. 




**Example Searches**
<img src="/images/concert.png">
<img src="/images/spotify.png">
<img src="/images/moive.png">
<img src="/images/do-what-it-says.png">

**Log File**
<img src="/images/log.png">