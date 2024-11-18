import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true }, // Chat room or conversation ID
  senderId: { type: String, required: true }, // User sending the message
  message: { type: String, required: true },  // Message content
  timestamp: { type: Date, default: Date.now }, // Timestamp for the message
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
