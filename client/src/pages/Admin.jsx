import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader, FolderOpen, Users, Mail, UploadCloud } from "lucide-react";
import API_URL from "../config/api";

const EASE = [0.22, 1, 0.36, 1];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const CARD_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const CATEGORIES = ["YouTube", "Instagram", "Brand Commercials", "Motion Graphics"];

const inputBase =
  "w-full bg-zinc-900/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200 backdrop-blur-sm border-white/[0.08] hover:border-white/20 focus:border-white/30";

// ─── Stat Card ───
const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div
    variants={CARD_ITEM}
    className="flex flex-col bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase select-none">
        {label}
      </p>
      <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-zinc-400" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white tabular-nums tracking-tight">{value}</p>
  </motion.div>
);

// ─── Main Component ───
const Admin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ projects: 0, subscribers: 0, messages: 0 });

  // ─── Fetch dashboard stats ───
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (error) {
        console.error("Stats fetch failed:", error.message);
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  // ─── Upload helper — returns { url, public_id } ───
  const uploadFile = async (file, type) => {
    const fd = new FormData();
    fd.append(type, file); // "image" or "video" must match multer field name
    const { data } = await axios.post(`${API_URL}/api/upload/${type}`, fd);
    return data; // { url, public_id }
  };

  // ─── Form submit ───
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      toast.error("Please select a video file");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Upload thumbnail and video — run in parallel for speed
      const [thumbnailResult, videoResult] = await Promise.all([
        thumbnail ? uploadFile(thumbnail, "image") : Promise.resolve({ url: "", public_id: "" }),
        uploadFile(video, "video"),
      ]);

      // Send ALL fields including public_ids — this is what fixes Cloudinary delete
      await axios.post(
        `${API_URL}/project`,
        {
          title,
          category,
          description,
          thumbnail: thumbnailResult.url,
          thumbnailPublicId: thumbnailResult.public_id, // ← fixes delete bug
          videoUrl: videoResult.url,
          videoPublicId: videoResult.public_id,          // ← fixes delete bug
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Project uploaded successfully");

      // Reset form
      setTitle("");
      setCategory("");
      setDescription("");
      setVideo(null);
      setThumbnail(null);
      setStats((prev) => ({ ...prev, projects: prev.projects + 1 }));
    } catch (error) {
      console.error("Upload failed:", error.message);
      toast.error(error?.response?.data?.message || "Failed to upload project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-0 pb-10">

      {/* ── Header ── */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">
          Overview
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* ── Stat Cards ── */}
      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <StatCard icon={FolderOpen} label="Projects"    value={stats.projects} />
        <StatCard icon={Users}      label="Subscribers" value={stats.subscribers} />
        <StatCard icon={Mail}       label="Messages"    value={stats.messages} />
      </motion.div>

      {/* ── Upload Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      >
        <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm">

          {/* Form header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.06]">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase select-none">
              Upload Project
            </p>
            <div className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center">
              <UploadCloud className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 sm:p-6">

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Title
              </label>
              <input
                type="text"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={inputBase}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={inputBase}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Thumbnail <span className="text-zinc-600 normal-case">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className={`${inputBase} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700`}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Description
              </label>
              <textarea
                placeholder="Project description…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className={`${inputBase} resize-none`}
              />
            </div>

            {/* Video */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                required
                className={`${inputBase} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700`}
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                  loading
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-white text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  "Upload Project"
                )}
              </motion.button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;