const Group = require("../models/Group");

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addGroup = async (req, res) => {
  const { name, members, balance } = req.body;

  try {
    const newGroup = new Group({ name, members, balance });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Group deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group" });
  }
};
