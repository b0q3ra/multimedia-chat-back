require('dotenv').config()//we set our enviromental variables
const http = require('http')//http server
const express = require('express')//express
const cors = require('cors')//cors middleware
const mongoose = require('mongoose')

//create server instance
const app = express()
const httpServer = http.createServer(app)


//launch server
httpServer.listen(process.env.PORT, () => {
    console.log(`app running on port: ${process.env.PORT}`)
})

//general purpose middleware declarations
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//CONNECT DB
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false').then(()=>console.log('mongodb connected...'))

//SOCKETS
const Sockets = require('./lib/socketio/Sockets')//require sockets 
const { getIO } = require('./lib/socketio/actions')//get socket actions

const io = getIO(httpServer)//we start the socket server

io.on('connection', (socket) => {//on connection

    socket.on('disconnect', () => {//on disconnect, unregister socket
        Sockets.removeById(socket.data.id)
    });

    socket.on('join', async ({room: chatId}) => {//on join, register socket
        
    });
});