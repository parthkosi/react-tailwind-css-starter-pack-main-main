const express = require("express");
const { getActivities, logActivity } = require("../controllers/activityController");
const router = express.Router();

router.get("/", getActivities);
router.post("/log", async (req, res) => {
  try {
    const { userId, action } = req.body;
    await logActivity(userId, action);
    res.status(200).json({ message: "Activity logged" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log activity" });
  }
});

module.exports = router;
