require('dotenv').config()              //we set our enviromental variables
const http = require('http')            //http server
const express = require('express')      //express
const cors = require('cors')            //cors middleware
const mongoose = require('mongoose')    //mongoose
const passport = require('passport')    //passport

//create server instance
const app = express()
const httpServer = http.createServer(app)

//launch server
httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`app running on port: ${process.env.PORT}`)
})

//general purpose middleware declarations
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())

//CONNECT DB
mongoose.connect('mongodb://localhost:27017/chat').then(()=>console.log('mongodb connected...'))

//PASSPORT CONFIG
app.use(passport.initialize())
require('./config/passport')(passport)

//ROUTES
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/chat', require('./routes/chat-routes'))

//SOCKETS
const initWebSockets = require('./lib/socketio/init')//the initWebSockets function inits all the socket stuff
initWebSockets(httpServer)