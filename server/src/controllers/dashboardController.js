const Project = require("../models/Project");
const Subscriber = require("../models/Subscriber");
const Contact = require("../models/Contact");

const getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.countDocuments();
    const subscribers = await Subscriber.countDocuments();
    const messages = await Contact.countDocuments();

    res.json({
      projects,
      subscribers,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};