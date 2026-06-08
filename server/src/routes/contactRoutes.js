const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createContact, getContacts, deleteContact, markAsRead, replyContact } = require("../controllers/contactController");

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

router.post("/", contactLimiter, submitContact);  

router.post("/", createContact);
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);
router.patch("/:id/read", protect, markAsRead);
router.post("/:id/reply", protect, replyContact);

module.exports = router;