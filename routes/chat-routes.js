const express = require("express");
const router = express.Router();
const passport = require('passport')
const chatController = require('../controllers/chat/chat-controllers')

router.get('/all', passport.authenticate('jwt', {session: false}), chatController.getAllChats)
router.post('/mychats', passport.authenticate('jwt', {session: false}), chatController.getMyChats)
router.post('/new', passport.authenticate('jwt', {session: false}), chatController.postNewChat)


module.exports = router