// src/routes/authRoutes.ts
import express from "express";
import { register, protectedRoute } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Register Route
router.post("/register", register);
// Protected Route (accessible only to authenticated users)
router.get("/protected", authMiddleware, protectedRoute);

export default router;
