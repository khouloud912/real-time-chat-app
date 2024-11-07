// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/database";
import authRoutes from "./src/routes/authRoutes"; // Import authRoutes

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

connectDB();
app.use("/auth", authRoutes);

console.log("11111");
app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
