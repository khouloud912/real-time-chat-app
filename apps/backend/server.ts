import app from "./src/app";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/database";
import authRoutes from "./src/routes/authRoutes";

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4000; // Set default port for testing

connectDB();
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
