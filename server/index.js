const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://conextchat.vercel.app",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/check/", (req, res) => {
  console.log("Works?");
  res.send("Hello World");
});
const server = app.listen(process.env.PORT, () => {
  console.log("Started Server on " + process.env.PORT);
});
const io = socket(server, {
  cors: {
    origin: "https://conextchat.vercel.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
