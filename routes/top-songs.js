let router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');
let middleware = require('../middleware/access');
const configSpotify = require('../config/spotify');


router.get('/', middleware.access, async (req,res) => {
    try {
      configSpotify.spotifyApi.setAccessToken(req.cookies.access_token);
      var resultLong = await configSpotify.spotifyApi.getMyTopTracks({time_range:"long_term"});
      var resultMedium = await configSpotify.spotifyApi.getMyTopTracks({time_range:"medium_term"});
      var resultShort = await configSpotify.spotifyApi.getMyTopTracks({time_range:"short_term"});
      res.render('index', {
        viewPath: 'top-songs/index.ejs',
        currentPage: 'top-songs',
        data : {long:resultLong.body,
                medium: resultMedium.body,
                short: resultShort.body
                },
        // BASE_URL: `${process.env.SERV_ADRESS}:${process.env.PORT}`,
        // siteKey :process.env.SiteKey
      })
    } catch (err) {
      res.status(400).send(err)
    }
  
  });
module.exports = router;

