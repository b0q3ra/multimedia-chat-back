const Sockets = require('./Sockets')//require sockets 
const { getIO } = require('./actions')//get socket actions


const initWebSockets = (httpServer) => {
    const io = getIO(httpServer)//we start the socket server

    io.on('connection', (socket) => {//on connection
        
        socket.on('disconnect', () => {//on disconnect, unregister socket
            Sockets.removeById(socket.data.id)
        });
        
        socket.on('message', async (params) => {//on join, register socket
            console.log(params)
            socket.emit('message', {test: 'ok'})
        });
    });
}

module.exports = initWebSockets