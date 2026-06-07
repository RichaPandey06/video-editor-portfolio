import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";


import API_URL from "../config/api";
const EASE = [0.22, 1, 0.36, 1];
const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const CARD_ITEM = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
const response = await axios.get(
  `${API_URL}/api/contact`, { headers: { Authorization: `Bearer ${token}` } });
        setMessages(response.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchMessages();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">Inbox</p>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-5 animate-pulse">
              <div className="h-3 bg-zinc-800/60 rounded-full w-1/4 mb-3" />
              <div className="h-3 bg-zinc-800/40 rounded-full w-1/3 mb-4" />
              <div className="h-3 bg-zinc-800/30 rounded-full w-full" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/60 border border-white/[0.08] rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-zinc-600" />
          </div>
          <p className="text-zinc-500 text-sm font-mono tracking-[0.15em] uppercase select-none">No messages yet</p>
        </div>
      ) : (
        <motion.div variants={STAGGER} initial="hidden" animate="visible" className="space-y-3">
          {messages.map((msg) => (
            <motion.div key={msg._id} variants={CARD_ITEM}
              className="bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-200">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-semibold text-zinc-400 select-none">{msg.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{msg.name}</p>
                </div>
                <p className="text-[11px] font-mono text-zinc-500 tracking-wide">{msg.email}</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-zinc-400 leading-relaxed">{msg.message}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminMessages;