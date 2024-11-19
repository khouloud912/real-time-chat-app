import Room from "../models/Room"; // Assume you have a Room model
import { io } from "../../server";

// Create a new room
export const createRoom = async (req, res) => {
  const { name, createdBy } = req.body;

  try {
    const room = new Room({ name, createdBy, members: [createdBy] });
    await room.save();
    return res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ message: "Failed to create room." });
  }
};

// Join a room
export const joinRoom = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    if (!room.members.includes(userId)) {
      room.members.push(userId);
      await room.save();
    }

    // Use socket.io to join the room
    const socket = req.app.get("socket");
    socket.join(roomId);

    return res.status(200).json(room);
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).json({ message: "Failed to join room." });
  }
};

// Send a message to a room
export const sendMessageToRoom = async (req, res) => {
  const { roomId, senderId, content } = req.body;

  try {
    // Emit the message to all members in the room
    const message = { roomId, senderId, content, createdAt: new Date() };
    io.to(roomId).emit("roomMessage", message);

    return res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Failed to send message." });
  }
};
