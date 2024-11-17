import express from "express";
import cors from 'cors';
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Optional, if you are sending cookies or other credentials
  }));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

export default app;
