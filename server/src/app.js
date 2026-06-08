const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.set("trust proxy", 1);

// Rate limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, 
  message: { message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, please try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent, please try again later." },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(globalLimiter);

// Routes
app.use("/api/project", projectRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;