const express = require("express");
const {
  getFriends,
  addFriend,
  removeFriend,
} = require("../controllers/friendController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getFriends);
router.post("/", authenticate, addFriend);
router.delete("/:id", authenticate, removeFriend);

module.exports = router;
