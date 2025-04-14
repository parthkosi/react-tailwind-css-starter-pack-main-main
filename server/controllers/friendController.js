const Friend = require("../models/Friends");

exports.getFriends = async (req, res) => {
  const friends = await Friend.find();
  res.json(friends);
};

exports.addFriend = async (req, res) => {
  const newFriend = new Friend(req.body);
  await newFriend.save();
  res.status(201).json(newFriend);
};

exports.removeFriend = async (req, res) => {
  const { id } = req.params;
  await Friend.findByIdAndDelete(id);
  res.json({ message: "Friend removed" });
};
