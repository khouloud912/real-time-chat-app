// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/database";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT ;

connectDB();

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
