import Message from "../models/Message";
import { io } from "../../server";

// Save a new message
export const sendMessage = async (req: any, res: any) => {
  const { senderId, receiverId, content } = req.body;

  try {
    // Save the message to the database
    const message = new Message({
      senderId,
      receiverId,
      content,
      createdAt: new Date(),
    });

    await message.save();

    // Emit the message in real-time to the receiver
    io.to(receiverId).emit("receiveMessage", message);

    return res.status(201).json(message);
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
