const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    thumbnailPublicId: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    videoPublicId: {
      type: String,
      required: [true, "Video public ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);