import app from "./src/app";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/database";
import authRoutes from "./src/routes/authRoutes";
import messageRoutes from "./src/routes/messageRoutes";
import userRoutes from "./src/routes/userRoutes";

const server = http.createServer(app);
const PORT = process.env.PORT;

const io = new Server(server);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
connectDB();
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("chat Server Running");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export { io };
