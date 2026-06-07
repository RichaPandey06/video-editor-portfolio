const express = require("express");
const cors = require("cors");

// ✅ Import your project routes
const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount the routes
app.use("/api/project", projectRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribers",subscriberRoutes);
app.use( "/api/auth", authRoutes );
app.use( "/api/dashboard", dashboardRoutes);

// Export the app so server.js can use it
module.exports = app;
