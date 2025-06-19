import express from "express";
import {
  createRoom,
  joinRoom,
  sendMessageToRoom,
} from "../controllers/roomController";

const router = express.Router();
// Create a new room
router.post("/", createRoom);
// Join a room
router.post("/join", joinRoom);
// Send a message to a room
router.post("/messages", sendMessageToRoom);

export default router;
