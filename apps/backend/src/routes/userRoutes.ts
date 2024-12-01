import express from "express";
import {
  getUserById,
  getUsers,
  getUsersWithChats,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/chats", authMiddleware, getUsersWithChats);

export default router;
