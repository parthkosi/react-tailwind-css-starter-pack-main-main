const express = require("express");
const {
  getGroups,
  addGroup,
  deleteGroup,
} = require("../controllers/groupController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", authenticate, getGroups);
router.post("/", authenticate, addGroup);
router.delete("/:id", authenticate, deleteGroup);

module.exports = router;
