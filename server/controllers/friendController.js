const Friend = require("../models/Friends");
const axios = require("axios");

// Utility function to log activity
const logActivity = async (userId, action) => {
  try {
    await axios.post("http://localhost:5000/api/activity/log", { userId, action });
  } catch (err) {
    console.error("Activity log failed:", err.message);
  }
};

// Get Friends
exports.getFriends = async (req, res) => {
  try {
    const friends = await Friend.find({ userId: req.userId });
    res.json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Add Friend
exports.addFriend = async (req, res) => {
  try {
    const { name, phone, balance } = req.body;
    const userId = req.userId;

    if (!name || !phone || balance === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const friend = new Friend({ name, phone, balance, userId });
    await friend.save();

    // Log activity
    await logActivity(userId, `Friend "${name}" was added.`);

    res.status(201).json(friend);
  } catch (error) {
    console.error("Error saving friend:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Remove Friend
exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const friend = await Friend.findOneAndDelete({ _id: id, userId });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    // Log activity using friend.name
    await logActivity(userId, `Friend "${friend.name}" was removed.`);

    res.json({ message: "Friend removed" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
