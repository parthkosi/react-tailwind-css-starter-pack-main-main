const express = require("express");
const {
  getFriends,
  addFriend,
  removeFriend,
} = require("../controllers/friendController");

const router = express.Router();

router.get("/", getFriends);
router.post("/", addFriend);
router.delete("/:id", removeFriend);

module.exports = router;
