let router = require('express').Router();
var querystring = require('querystring');
var request = require('request'); // "Request" library
var client_id = `${process.env.client_id}`; // Your client id
var client_secret = `${process.env.client_secret}`; // Your secret
var redirect_uri = `${process.env.redirect_uri}`; // Your redirect uri
var stateKey = 'spotify_auth_state';

 /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
  var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  /* GET home page. */
  router.get('/', async function(req, res, next) {
    // console.log(req.cookies.access_token)
    // if(req.cookies.access_token){
    //   res.redirect('/user');
    // }
    // else{
    //   res.render('index', {
    //     viewPath: 'login/index.ejs',
    //     currentPage: 'home',
    //   })
    // }
    res.render('index', {
          viewPath: 'login/index.ejs',
          currentPage: 'home',
        })
  });

  router.get('/login', function(req, res) {
 
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-follow-read user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
 
  router.get('/callback', function(req, res) {
 
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
          });
  
          // we can also pass the token to the browser to make requests from there
          res.cookie('access_token', access_token,{maxAge: Date.now() + 3600});
          res.cookie('refresh_token', refresh_token,{maxAge: Date.now() + (10 * 365 * 24 * 60 * 60)});
          // console.log(response,body);
          res.redirect(req.query.backto?req.query.backto:'/user');
          
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
  router.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        redirect_uri: `${process.env.SERV_ADRESS}:${process.env.PORT}/`+req.query.backto,
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.cookie('access_token', access_token,{maxAge: Date.now() + 3600});
        res.redirect(req.query.backto);
      }
    });
  }); 

  /* GET spotify logout */
router.get('/logout', function (req, res) {
  res.cookie('access_token', '',{maxAge:0});
  res.cookie('refresh_token', '',{maxAge:0});
res.redirect('/');
})
module.exports = router;
