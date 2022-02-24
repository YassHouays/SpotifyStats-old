const dotenv = require('dotenv').config()
var SpotifyWebApi = require('spotify-web-api-node');
const configSpotify = require('../config/spotify');

module.exports = {
    access: async function access (req, res, next) {

      if(!req.cookies.access_token){
        res.redirect('/login');
      }else{
        // Set du token
        // configSpotify.spotifyApi.setAccessToken(req.cookies.access_token);


        //Cannot set headers after they are sent to the client
        if(!req.cookies.access_token && req.cookies.refresh_token){
          res.redirect('/refresh_token?refresh_token='+req.cookies.refresh_token+'&backto='+req.baseURl);
        }
      }
		next()
	},
}