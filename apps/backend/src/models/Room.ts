import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true }, // User ID of the creator
  members: { type: [String], default: [] }, // Array of User IDs
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Room", roomSchema);
