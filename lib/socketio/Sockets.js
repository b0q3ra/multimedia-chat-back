class Sockets {

    constructor() {
        this.sockets = []
    }

    add(socket){//register new socket
        const _socket = this.sockets.find((s) => s.data.id === socket.data.id)//search if the socket is already registered
        if(_socket) return //if socket registered return

        this.sockets.push(socket)//else, register socket inise sockets array
    }

    removeById(id){//remove socket by id
        this.sockets = this.sockets.filter((s) => s.data.id !== id)
    }

    findById(id) {//find socket by id
        return this.sockets.find((s) => s.data.id === id);
      }
      
}

const sockets = new Sockets();

module.exports = sockets;