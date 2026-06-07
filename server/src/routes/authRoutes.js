const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 5,                    // block after 5 failed attempts
  message: { message: "Too many login attempts. Try again in 15 minutes." },
});

// loginLimiter runs BEFORE login — if limit exceeded, login never runs
router.post("/login", loginLimiter, login);

module.exports = router;
