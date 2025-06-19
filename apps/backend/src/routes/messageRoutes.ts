import express from "express";
import { sendMessage, getMessages, markMessageAsRead, typingIndicator, deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

// Save a new message
router.post("/", sendMessage);
router.get("/", getMessages);
router.post("/typing", typingIndicator);
router.put("/read", markMessageAsRead);
router.put("/:messageId", deleteMessage);

export default router;
