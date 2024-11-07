// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Temporary in-memory user store for simplicity
const users: { username: string; password: string }[] = []; // Replace with real DB in production

// Register function
export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Store the user (In real production, store this in DB)
  users.push({ username, password });

  return res.status(201).json({ message: 'User registered successfully' });
};

// Login function
export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT Token
  const token = jwt.sign(
    { username: user.username },
    process.env.AUTH0_CLIENT_SECRET!,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ token });
};

// Protected route function
export const protectedRoute = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'This is a protected route' });
};
