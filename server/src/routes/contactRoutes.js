const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit"); // was missing
const protect = require("../middleware/authMiddleware");
const {
  createContact,
  getContacts,
  deleteContact,
  markAsRead,
  replyContact,
} = require("../controllers/contactController");



router.get("/", protect, getContacts);           // no limiter — admin only
router.delete("/:id", protect, deleteContact);
router.patch("/:id/read", protect, markAsRead);
router.post("/:id/reply", protect, replyContact);

module.exports = router;