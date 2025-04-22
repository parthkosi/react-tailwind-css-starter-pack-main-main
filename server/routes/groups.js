const express = require("express");
const {
  getGroups,
  addGroup,
  deleteGroup,
} = require("../controllers/groupController");

const router = express.Router();
router.get("/", getGroups);
router.post("/", addGroup);
router.delete("/:id", deleteGroup);

module.exports = router;
