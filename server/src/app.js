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
app.use("/project", projectRoutes);
app.use("/upload", uploadRoutes);
app.use("/contact", contactRoutes);
app.use("/subscribers",subscriberRoutes);
app.use( "/auth", authRoutes );
app.use( "/dashboard", dashboardRoutes);

// Export the app so server.js can use it
module.exports = app;
