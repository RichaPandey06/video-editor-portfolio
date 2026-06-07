import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader, UserPlus } from "lucide-react";
import API_URL from "../config/api";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/register`, { email, password });
      toast.success("Account created! Please sign in.");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-zinc-400" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-2 select-none">Admin</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
        </div>

        {/* Form */}
        <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800/60 border border-white/[0.08] hover:border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-800/60 border border-white/[0.08] hover:border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 mt-2 ${
                loading
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-white text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              {loading ? <><Loader className="w-4 h-4 animate-spin" /> Creating…</> : "Create Account"}
            </motion.button>
          </form>

          <p className="text-center text-xs text-zinc-600 mt-4">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-zinc-400 hover:text-white transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;