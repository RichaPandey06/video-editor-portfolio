import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Download } from "lucide-react";
import API_URL from "../config/api";

const EASE = [0.22, 1, 0.36, 1];
const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const ROW_ITEM = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${API_URL}/subscribers`, { headers });
        setSubscribers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const exportCSV = () => {
    const header = ["Email", "Date & Time"];
    const rows = subscribers.map((s) => [
      s.email,
      new Date(s.createdAt).toLocaleString(),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">List</p>
          <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-500/10 transition-colors text-sm text-zinc-400 hover:text-violet-400"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* Count */}
      {!loading && subscribers.length > 0 && (
        <p className="text-[11px] font-mono text-zinc-500 tracking-wider">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-5 animate-pulse">
              <div className="h-3 bg-zinc-800/60 rounded-full w-1/3 mb-3" />
              <div className="h-3 bg-zinc-800/40 rounded-full w-1/5" />
            </div>
          ))}
        </div>

      ) : subscribers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/60 border border-white/[0.08] rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-zinc-600" />
          </div>
          <p className="text-zinc-500 text-sm font-mono tracking-[0.15em] uppercase select-none">No subscribers yet</p>
        </div>

      ) : (
        <motion.div variants={STAGGER} initial="hidden" animate="visible"
          className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-2 px-5 py-3 border-b border-white/[0.06] bg-zinc-900/40">
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Email</p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Joined</p>
          </div>
          {/* Rows */}
          {subscribers.map((s, i) => (
            <motion.div key={s._id} variants={ROW_ITEM}
              className={`grid grid-cols-2 px-5 py-4 transition-colors hover:bg-white/[0.02] ${
                i !== subscribers.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}>
              <p className="text-sm text-zinc-300 truncate">{s.email}</p>
              <p className="text-sm font-mono text-zinc-500">{new Date(s.createdAt).toLocaleString()}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminSubscribers;