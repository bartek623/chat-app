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
  currentUsers.push({ userid: socket.id });
  socket.emit("update_users", currentUsers);
  socket.broadcast.emit("update_users", currentUsers);

  // New message
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // User logged in by setting username
  socket.on("user_logged_in", (userData) => {
    const userIndex = currentUsers.findIndex(
      (user) => user.userid === userData.userid
    );
    currentUsers.splice(userIndex, 1, {
      username: userData.username,
      userid: userData.userid,
    });

    socket.emit("update_users", currentUsers);
    socket.broadcast.emit("update_users", currentUsers);
  });

  // User disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
    const userIndex = currentUsers.findIndex(
      (user) => user.userid === socket.id
    );

    socket.broadcast.emit("user_disconnected", currentUsers[userIndex]);

    currentUsers.splice(userIndex, 1);
    socket.broadcast.emit("update_users", currentUsers);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
