const Sockets = require('./Sockets')//require sockets 
const { getIO } = require('./actions')//get socket actions


const initWebSockets = (httpServer) => {
    const io = getIO(httpServer)//we start the socket server

    io.on('connection', (socket) => {//on connection
        
        socket.on('disconnect', () => {//on disconnect, unregister socket
            Sockets.removeById(socket.data.id)
        });

        socket.on('join', async ({ room: chatId }) => {//on join, register socket
            
        });
    });
}

module.exports = initWebSockets