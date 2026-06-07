import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Pencil, Trash2, FolderOpen } from "lucide-react";
import API_URL from "../config/api";
const EASE = [0.22, 1, 0.36, 1];
const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const CARD_ITEM = { hidden: { opacity: 0, y: 20, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
       const response = await axios.get(
  `${API_URL}/project`
);
        setProjects(response.data);
      } catch (error) { console.error(error); toast.error("Failed to load projects"); }
      finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
  `${API_URL}/project/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) { console.error(error); toast.error("Delete failed"); }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">Manage</p>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden animate-pulse">
              <div className="h-44 bg-zinc-800/60" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-zinc-800/60 rounded-full w-3/4" />
                <div className="h-3 bg-zinc-800/40 rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/60 border border-white/[0.08] rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center mb-4">
            <FolderOpen className="w-5 h-5 text-zinc-600" />
          </div>
          <p className="text-zinc-500 text-sm font-mono tracking-[0.15em] uppercase select-none">No projects yet</p>
        </div>
      ) : (
        <motion.div variants={STAGGER} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <motion.div key={project._id} variants={CARD_ITEM} className="group flex flex-col bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-200">
              <div className="relative overflow-hidden h-44 bg-zinc-950 flex-shrink-0">
                <img src={project.thumbnail || "/placeholder.jpg"}
                  onError={(e) => { e.target.src = "/placeholder.jpg"; }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/70 border border-white/10">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-col flex-grow p-4 gap-2">
                <h3 className="text-sm font-semibold text-white leading-snug">{project.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed flex-grow line-clamp-2">{project.description}</p>
                <div className="flex gap-2 pt-2 border-t border-white/[0.06]">
                  <button onClick={() => handleDelete(project._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-800/60 border border-white/[0.06] hover:border-red-500/30 hover:text-red-400 text-zinc-400 text-xs font-medium transition-all duration-200">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                  <button onClick={() => navigate(`/admin/edit-project/${project._id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-800/60 border border-white/[0.06] hover:border-white/20 hover:text-white text-zinc-400 text-xs font-medium transition-all duration-200">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminProjects;