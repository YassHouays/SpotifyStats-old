const express = require('express');
const router = express.Router();


router.use('/', require('./auth') );
router.use('/user', require('./user'));
router.use('/top-songs', require('./top-songs'));
router.use('/top-artists', require('./top-artists'));



/* GET spotify logout */
router.get('/logout', function (req, res) {
    for (let prop in req.cookies) {
        if (!req.cookies.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
    }

	res.redirect('/');
})

module.exports = router;
