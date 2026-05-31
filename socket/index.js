const { Server } = require("socket.io");
const corsConfig = require("../config/cors");
const chatSocket = require("./chat.socket");

module.exports = (server) => {
  const io = new Server(server, {
    cors: corsConfig,
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log(" Client connected:", socket.id);
    chatSocket(io, socket);
  });

  return io;
};
