const Sockets = require("./Sockets");
const Chat = require("../../models/chat");
const Message = require("../../models/message");

const getIO = (httpServer) => {

    const io = require("socket.io")(httpServer, {
        cors: {
          origin: "https://example.com",
          methods: ["GET", "POST"]
        }
      });

      return io
}

module.exports.getIO = getIO