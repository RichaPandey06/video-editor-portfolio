const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Memory storage — file lives in RAM as a buffer, never touches disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max — prevents abuse
  },
  fileFilter: (req, file, cb) => {
    // Whitelist mime types — never trust the client
    const allowedVideo = ["video/mp4", "video/webm", "video/quicktime"];
    const allowedImage = ["image/jpeg", "image/png", "image/webp"];
    const allowed = [...allowedVideo, ...allowedImage];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
    }
  },
});

// Helper: converts buffer to base64 data URI for Cloudinary upload
const bufferToDataUri = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

// POST /api/upload/video
router.post("/video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
      resource_type: "video",
      folder: "portfolio-videos",
    });

    // Return both URL and public_id — frontend must save both
    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/upload/image
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
      resource_type: "image",
      folder: "portfolio-thumbnails",
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;