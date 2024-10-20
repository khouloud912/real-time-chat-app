// server.js
import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
