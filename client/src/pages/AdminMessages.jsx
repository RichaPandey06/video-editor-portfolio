import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, CheckCheck, Reply, Send, X } from "lucide-react";
import API_URL from "../config/api";

const EASE = [0.22, 1, 0.36, 1];
const STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const CARD_ITEM = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/contact`, { headers });
        setMessages(response.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contact/${id}`, { headers });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (replyingTo === id) setReplyingTo(null);
    } catch (error) { console.error(error); }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`${API_URL}/contact/${id}/read`, {}, { headers });
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m));
    } catch (error) { console.error(error); }
  };

  const handleReply = async (msg) => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await axios.post(`${API_URL}/contact/${msg._id}/reply`, { replyText }, { headers });
      setReplyingTo(null);
      setReplyText("");
      // mark as read after reply
      setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, read: true } : m));
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const toggleReply = (id) => {
    if (replyingTo === id) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(id);
      setReplyText("");
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">Inbox</p>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        </div>
        {unreadCount > 0 && (
          <span className="text-[11px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
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
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg._id} variants={CARD_ITEM}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                className={`border rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-200 ${
                  msg.read ? "bg-zinc-900/40 border-white/[0.06]" : "bg-zinc-900/60 border-white/[0.12] shadow-[0_0_0_1px_rgba(139,92,246,0.1)]"
                }`}>

                {/* Header */}
                <div className="flex flex-col gap-2 px-5 py-3 border-b border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />}
                    <div className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-semibold text-zinc-400 select-none">{msg.name?.[0]?.toUpperCase()}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{msg.name}</p>
                    {!msg.read && <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">New</span>}
                  </div>

                  <div className="flex items-center flex-wrap gap-2 ml-10 sm:ml-0">
                    <p className="text-[11px] font-mono text-zinc-500 tracking-wide truncate max-w-[140px] sm:max-w-none">{msg.email}</p>
                    <p className="text-[11px] font-mono text-zinc-600 hidden sm:block">{new Date(msg.createdAt).toLocaleDateString()}</p>

                    {/* Reply button */}
                    <button onClick={() => toggleReply(msg._id)}
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 ${
                        replyingTo === msg._id
                          ? "bg-violet-500/20 border-violet-500/40"
                          : "bg-zinc-800/80 border-white/[0.06] hover:border-violet-500/40 hover:bg-violet-500/10"
                      }`}
                      title="Reply">
                      {replyingTo === msg._id
                        ? <X className="w-3.5 h-3.5 text-violet-400" />
                        : <Reply className="w-3.5 h-3.5 text-zinc-400" />}
                    </button>

                    {!msg.read && (
                      <button onClick={() => handleMarkAsRead(msg._id)}
                        className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center hover:border-violet-500/40 hover:bg-violet-500/10 transition-colors flex-shrink-0"
                        title="Mark as read">
                        <CheckCheck className="w-3.5 h-3.5 text-zinc-400" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(msg._id)}
                      className="w-7 h-7 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center hover:border-red-500/40 hover:bg-red-500/10 transition-colors flex-shrink-0"
                      title="Delete">
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <div className="px-5 py-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{msg.message}</p>
                </div>

                {/* Reply box */}
                <AnimatePresence>
                  {replyingTo === msg._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="px-5 pb-4 border-t border-white/[0.06]">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-4 mb-2">
                        Replying to {msg.email}
                      </p>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        rows={3}
                        className="w-full bg-zinc-800/60 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-white/20 resize-none transition-colors"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleReply(msg)}
                          disabled={sending || !replyText.trim()}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-white"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {sending ? "Sending..." : "Send Reply"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default AdminMessages;