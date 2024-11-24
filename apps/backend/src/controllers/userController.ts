import User from "../models/User";

// Fetch all users
export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
};

// Fetch a single user by ID
export const getUserById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};
