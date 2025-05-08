const Group = require("../models/Group");
const axios = require("axios");

// Create New Group
exports.addGroup = async (req, res) => {
  try {
    const { name, members, balance } = req.body;
    const userId = req.userId;

    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const newGroup = new Group({
      name,
      members: members || 0,
      balance: balance || 0,
      userId,
    });

    await newGroup.save();

    // Log the activity
    await axios.post("http://localhost:5000/api/activity/log", {
      userId,
      action: `Group "${name}" was created.`,
    });

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Groups for Logged-in User
exports.getGroups = async (req, res) => {
  try {
    const userId = req.userId;
    const groups = await Group.find({ userId });

    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Group
exports.deleteGroup = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const group = await Group.findOneAndDelete({ _id: id, userId });

    if (!group) {
      return res.status(404).json({ error: "Group not found or unauthorized" });
    }

    // Log the activity
    await axios.post("http://localhost:5000/api/activity/log", {
      userId,
      action: `Group "${group.name}" was deleted.`,
    });

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Server error" });
  }
};
