let router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');
let middleware = require('../middleware/access');
const configSpotify = require('../config/spotify');

router.get('/', middleware.access, async (req,res) => {
    try {
      configSpotify.spotifyApi.setAccessToken(req.cookies.access_token);
      var result = await configSpotify.spotifyApi.getUserPlaylists();
      // res.status(200).send(result.body);
      res.render('index', {
        viewPath: 'user/index.ejs',
        currentPage: 'user',
        data : result.body,
        // BASE_URL: `${process.env.SERV_ADRESS}:${process.env.PORT}`,
        // siteKey :process.env.SiteKey
      })
    } catch (err) {
      res.status(400).send(err)
    }
  
  });
module.exports = router;
