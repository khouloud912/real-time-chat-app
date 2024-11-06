// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
