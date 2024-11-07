"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./src/config/database"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT;
(0, database_1.default)();
app.use("/auth", authRoutes);
console.log("11111");
app.get("/", (req, res) => {
    res.send("Chat Server Running");
});
server.listen(4000, () => {
    console.log("Server running on port 4000");
});
