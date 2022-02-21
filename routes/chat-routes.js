const express = require("express");
const router = express.Router();
const passport = require('passport')
const chatController = require('../controllers/chat/chat-controllers')

router.get('/chats', passport.authenticate('jwt', {session: false}), chatController.getAllChats)


module.exports = router