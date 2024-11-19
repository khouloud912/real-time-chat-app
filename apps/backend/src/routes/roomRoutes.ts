import express from "express";
import {
  createRoom,
  joinRoom,
  sendMessageToRoom,
} from "../controllers/roomController";

const router = express.Router();

// Create a new room
router.post("/rooms", createRoom);

// Join a room
router.post("/rooms/join", joinRoom);

// Send a message to a room
router.post("/rooms/messages", sendMessageToRoom);

export default router;
