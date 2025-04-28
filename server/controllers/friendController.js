const Friend = require("../models/Friends");

exports.getFriends = async (req, res) => {
  try {
    // Fetch friends filtered by userId (from token)
    const friends = await Friend.find({ userId: req.userId });
    res.json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const { name, phone, balance } = req.body;
    const userId = req.userId; // userId from token verification

    // Validate input data
    if (!name || !phone || !balance) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const friend = new Friend({ name, phone, balance, userId });
    await friend.save();
    res.status(201).json(friend);
  } catch (error) {
    console.error("Error saving friend:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete friend only if the friend belongs to the user (userId matches)
    const friend = await Friend.findOneAndDelete({ _id: id, userId: req.userId });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    res.json({ message: "Friend removed" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
