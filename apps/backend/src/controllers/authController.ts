import axios from "axios";
import User from "../models/User"; // Assuming you have a User model to store user details

// Register route
export const register = async (req: any, res: any) => {
  try {
    const auth0User = req.body;
    if (!auth0User) {
      return res.status(400).json({ message: "Invalid or missing user data." });
    }

    console.log("auth0User", auth0User);
    // Use upsert to avoid potential race conditions
    const user = await User.findOneAndUpdate(
      { auth0Id: auth0User.sub },
      {
        auth0Id: auth0User.sub,
        email: auth0User.email,
        displayName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: new Date(),
      },
      { upsert: true, new: true } // Upsert ensures atomic operation
    );

    console.log("user", user);
    // Respond with user data
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:");
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

// Protected Route (accessible only with valid JWT)
export const protectedRoute = (req: any, res: any) => {
  return res.status(200).json({ message: "This is a protected route" });
};
