const dotenv = require('dotenv').config()
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '7e951c713f9c40ea8a501313cb087ea9',
    clientSecret: '168de3bc141f4ff2b27824cc253a46ba',
    redirectUri: 'https://localhost:8888/callback'
    });

module.exports = {spotifyApi} 