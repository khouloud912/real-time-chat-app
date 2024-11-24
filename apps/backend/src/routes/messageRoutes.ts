import express from "express";
import { sendMessage, getMessages, markMessageAsRead, typingIndicator, deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

// Save a new message
router.post("/newMessage", sendMessage);
router.get("/messages/:roomId", getMessages);
router.get("/messages/:roomId", getMessages);
router.post("/messages/typing", typingIndicator);
router.put("/messages/read", markMessageAsRead);
router.put("/messages/:messageId", deleteMessage);

export default router;
