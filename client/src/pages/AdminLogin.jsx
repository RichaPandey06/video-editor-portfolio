import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";


import API_URL from "../config/api";
const EASE = [0.22, 1, 0.36, 1];

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
  `${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full bg-zinc-900/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200 backdrop-blur-sm border-white/[0.08] hover:border-white/20 focus:border-white/30";

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* Header strip */}
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase select-none">Admin</p>
            <h1 className="text-xl font-bold tracking-tight mt-0.5">
              RICHA<span className="text-zinc-500">.ADMIN</span>
            </h1>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6">
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">Email</label>
              <input type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBase} />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputBase} />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`mt-2 w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${loading ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-white text-zinc-950 hover:bg-zinc-100"}`}
            >
              {loading ? <><Loader className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;