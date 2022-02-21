const express = require("express");
const router = express.Router();
const passport = require('passport')

router.post('/login', require('../controllers/auth/login-controller'))//login
router.post('/register', require('../controllers/auth/register-controller'))//login
router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    res.json({//return user
        status: 'success',
        data: req.user
    })
})

module.exports = router