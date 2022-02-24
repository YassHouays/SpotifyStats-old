/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

 var express = require('express'); // Express web server framework
 var cors = require('cors');
 var cookieParser = require('cookie-parser');
 const dotenv = require('dotenv').config()


 
 var app = express();
 
 app.use(express.static(__dirname + '/public'));
 app.set('view engine', 'ejs');
 app.use(cors());
 app.use(cookieParser());
 
// Router
const router = require('./routes/routes');
app.use('/', router);
 
 console.log(`Listening to requests on ${process.env.SERV_ADRESS}:${process.env.PORT}`);
 app.listen(`${process.env.PORT}`);