const Activity = require("../models/Activity");

exports.logActivity = async (userId, action) => {
  try {
    const newActivity = new Activity({ userId, action });
    await newActivity.save();
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
};

exports.getActivities = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const activities = await Activity.find({ userId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
