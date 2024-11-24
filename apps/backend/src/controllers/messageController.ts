import Message from "../models/Message";
import { io } from "../../server";

// Save a new message
export const sendMessage = async (req: any, res: any) => {
  const { senderId, receiverId, message } = req.body;
  try {
    // Save the message to the database
    const messageData = new Message({
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    });

    await messageData.save();
    // Emit the message in real-time to the receiver
    io.emit("receiveMessage", message);
    return res.status(201).json(messageData);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Failed to send message." });
  }
};

// Get chat history for a room
export const getMessages = async (req: any, res: any) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    return res.status(200).json(messages);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve messages", details: error.message });
  }
};

// Emit typing indicator event
export const typingIndicator = (req: any, res: any) => {
  const { senderId, receiverId } = req.body;

  // Emit the typing event to the receiver
  io.to(receiverId).emit("typing", { senderId });

  return res.status(200).json({ message: "Typing indicator sent" });
};

// Update the message as read
export const markMessageAsRead = async (req: any, res: any) => {
  const { messageId, receiverId } = req.body;

  try {
    // Update the message status to 'read'
    const message = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );

    // Emit a "messageRead" event to the sender
    io.to(receiverId).emit("messageRead", message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error marking message as read:", error);
    return res.status(500).json({ message: "Failed to mark message as read." });
  }
};

// Delete a message
export const deleteMessage = async (req: any, res: any) => {
  const { messageId } = req.params;

  try {
    // Mark the message as deleted in the database
    const message = await Message.findByIdAndUpdate(
      messageId,
      { deleted: true },
      { new: true }
    );

    // Emit a "messageDeleted" event to the clients in the chat
    io.emit("messageDeleted", message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ message: "Failed to delete message." });
  }
};

// Track user presence
export const trackUserPresence = () => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    io.emit("userStatus", { userId, status: "online" });
    // Handle disconnection
    socket.on("disconnect", () => {
      io.emit("userStatus", { userId, status: "offline" });
    });
  });
};
