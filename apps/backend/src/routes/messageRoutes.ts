import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// Save a new message
router.post("/messages", sendMessage);

// Get chat history for a room
router.get("/messages/:roomId", getMessages);

export default router;
