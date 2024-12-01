import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, // User sending the message
  receiverId: { type: String, required: true }, // User sending the message
  message: { type: String, required: true }, // Message content
  read: { type: Boolean }, // Message content
  roomId: { type: String }, // Chat room or conversation ID
  timestamp: { type: Date, default: Date.now }, // Timestamp for the message
  deleted: { type: Boolean },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
