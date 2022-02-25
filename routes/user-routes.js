const express = require("express");
const router = express.Router();
const passport = require('passport')
const userController = require('../controllers/users/users-controllers')

router.get('/all', userController.getAllUsers)//get all users


module.exports = router