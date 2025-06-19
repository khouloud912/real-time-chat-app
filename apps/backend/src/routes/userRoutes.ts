import express from "express";
import {
  getUserById,
  getUsers,
  getUsersWithChats,
  getConnectedUser
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
router.get("/me", authMiddleware, getConnectedUser);
router.get("/", authMiddleware, getUsers);
router.get("/chats", authMiddleware, getUsersWithChats);
router.get("/:id", getUserById);

export default router;
