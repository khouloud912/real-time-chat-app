import Message from "../models/Message";
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

export const getUsersWithChats = async (req: any, res: any) => {
  try {
    // Extract userId from the authenticated user's token
    const userId = req.auth.sub;
    console.log("iddd", userId);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is missing from the token" });
    }

    // Find the latest message with each user
    const chats = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by most recent first
      },
      {
        $group: {
          _id: {
            user: {
              $cond: [
                { $eq: ["$senderId", userId] },
                "$receiverId",
                "$senderId",
              ],
            },
          },
          lastMessage: { $first: "$$ROOT" }, // Get the latest message for each user
        },
      },
    ]);
    console.log("chats", chats);
    // Get the user IDs from the grouped results
    const userIds = chats.map((chat) => chat._id.user);

    if (userIds.length === 0) {
      return res.status(200).json([]); // No chats found
    }

    // Fetch user details and add the last message
    const users = await User.find({ _id: { $in: userIds } })
      .select("name email avatarUrl")
      .lean();

    // Combine user details with last message
    const usersWithChats = users.map((user) => {
      const chat = chats.find(
        (chat) => chat._id.user.toString() === user._id.toString()
      );
      return {
        ...user,
        lastMessage: chat?.lastMessage?.content || "No message available", // Default fallback
        lastMessageDate: chat?.lastMessage?.createdAt || null, // Optional: Add the date
      };
    });

    return res.status(200).json(usersWithChats);
  } catch (error) {
    console.error("Error fetching chat users:", error);
    return res.status(500).json({ error: "Failed to fetch chat users" });
  }
};
