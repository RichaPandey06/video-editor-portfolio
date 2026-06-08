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

// Only rate-limit public form submissions (POST), not the admin GET
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent, please try again later." },
});

router.post("/", contactLimiter, createContact); // was duplicated + used undefined submitContact
router.get("/", protect, getContacts);           // no limiter — admin only
router.delete("/:id", protect, deleteContact);
router.patch("/:id/read", protect, markAsRead);
router.post("/:id/reply", protect, replyContact);

module.exports = router;