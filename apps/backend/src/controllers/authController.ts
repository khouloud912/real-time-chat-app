import axios from "axios";
import User from "../models/User"; // Assuming you have a User model to store user details

// Register route
export const register = async (req: any, res: any) => {
  try {
    const auth0User = req.body;
    // Check if auth0User is defined and has necessary properties
    if (!auth0User) {
      return res.status(400).json({ message: "Invalid user data." });
    }

    let user = await User.findOne({ auth0Id: auth0User.sub });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({
        auth0Id: auth0User.sub,
        email: auth0User.email,
        displayName: auth0User.name,
        avatarUrl: auth0User.picture,
        createdAt: new Date(),
      });

      await user.save();
    }

    // Respond with the user data
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

// Login route (using Auth0 authentication)

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Make a request to Auth0's API to authenticate the user
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "password",
        username: email, // Auth0 typically uses 'username' instead of 'email' for login
        password,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE, // Optional, depending on your Auth0 setup
      }
    );

    console.log("Auth0 response data:", response.data);
    // Get the Auth0 token (JWT)
    const { access_token, id_token } = response.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        createdAt: Date.now(),
        lastSeen: Date.now(), // Optional: Update lastSeen when the user logs in
      });
      await user.save();
    } else {
      // Optionally update lastSeen field
      await user.save();
    }

    // Return the Auth0 token to the client
    return res.status(200).json({ token: id_token, access_token });
  } catch (err) {
    console.error("Authentication error:", err);
    return res
      .status(401)
      .json({ message: "Invalid credentials or error authenticating" });
  }
};
// Protected Route (accessible only with valid JWT)
export const protectedRoute = (req: any, res: any) => {
  return res.status(200).json({ message: "This is a protected route" });
};
