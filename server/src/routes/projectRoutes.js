const express = require("express");
const router = express.Router();

const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const Project = require("../models/Project");
const protect = require("../middleware/authMiddleware");

// Get All Projects
router.get("/", getProjects);

// Create Project
router.post(
  "/",
  protect,
  createProject
);

// Get Projects By Category
router.get("/category/:category", async (req, res) => {
  try {
    const projects = await Project.find({
      category: req.params.category,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Project
router.get(
  "/:id",
  protect,
  getProjectById
);

// update project
router.put(
  "/:id",
  protect,
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  protect,
  deleteProject
);


module.exports = router;