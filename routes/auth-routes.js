let express = require("express");
let router = express.Router();

router.post('/login', require('../controllers/auth/login-controller'))//login
router.post('/register', require('../controllers/auth/register-controller'))//login

module.exports = router