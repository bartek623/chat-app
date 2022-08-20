const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const currentUsers = [];

io.on("connection", (socket) => {
  // User connected
  console.log(`User Connected: ${socket.id}`);
  currentUsers.push(socket.id);
  socket.emit("update_users", currentUsers);
  socket.broadcast.emit("update_users", currentUsers);

  // New message
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // User disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("user_disconnected", socket.id);

    const userIndex = currentUsers.findIndex((id) => id === socket.id);
    currentUsers.splice(userIndex, 1);
    socket.broadcast.emit("update_users", currentUsers);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
