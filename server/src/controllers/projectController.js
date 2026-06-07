const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// ─── Helper: safely delete a Cloudinary asset ───
// Wraps destroy() so a Cloudinary failure doesn't crash the whole request
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    // Log it but don't throw — a failed CDN cleanup shouldn't break the API response
    console.error(`Cloudinary delete failed [${resourceType}] ${publicId}:`, err.message);
  }
};

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Projects By Category
const getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({
      category: {
        $regex: new RegExp(`^${req.params.category}$`, "i"),
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST /api/projects
// Expects: { title, category, description, thumbnail, thumbnailPublicId, videoUrl, videoPublicId }
const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      thumbnail,
      thumbnailPublicId,
      videoUrl,
      videoPublicId,
    } = req.body;

    // Explicit field extraction — never do Project.create(req.body) directly
    // req.body could contain extra fields that corrupt your schema (mass assignment attack)
    const project = await Project.create({
      title,
      category,
      description,
      thumbnail,
      thumbnailPublicId,
      videoUrl,
      videoPublicId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }

    const {
      title,
      category,
      description,
      thumbnail,
      thumbnailPublicId,
      videoUrl,
      videoPublicId,
    } = req.body;

    // If a NEW thumbnail was uploaded (different public_id), delete the old one
    if (
      thumbnailPublicId &&
      thumbnailPublicId !== existing.thumbnailPublicId &&
      existing.thumbnailPublicId
    ) {
      await deleteFromCloudinary(existing.thumbnailPublicId, "image");
    }

    // If a NEW video was uploaded (different public_id), delete the old one
    if (
      videoPublicId &&
      videoPublicId !== existing.videoPublicId &&
      existing.videoPublicId
    ) {
      await deleteFromCloudinary(existing.videoPublicId, "video");
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        thumbnail: thumbnail || existing.thumbnail,
        thumbnailPublicId: thumbnailPublicId || existing.thumbnailPublicId,
        videoUrl: videoUrl || existing.videoUrl,
        videoPublicId: videoPublicId || existing.videoPublicId,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete Cloudinary assets BEFORE removing DB record
    // If Cloudinary fails, DB record stays intact — you can retry
    // If you delete DB first and Cloudinary fails, public_id is lost forever
    await deleteFromCloudinary(project.thumbnailPublicId, "image");
    await deleteFromCloudinary(project.videoPublicId, "video");

    await project.deleteOne();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject,
};