import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import API_URL from "../config/api";

// ─── Absolute hash paths so links work from any route ───
const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "Reviews", href: "/#reviews" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { icon: FaInstagram, url: "https://instagram.com/richaedit", label: "Instagram" },
  { icon: FaThreads, url: "https://threads.net/@richaedit", label: "Threads" },
  { icon: FaYoutube, url: "https://youtube.com/@RichaPandeyEdits", label: "YouTube" },
  { icon: FaLinkedin, url: "https://linkedin.com/in/richa-pandey-676a78414", label: "LinkedIn" },
  { icon: FaXTwitter, url: "https://x.com/RichaPandeyEdit", label: "X (Twitter)" },

];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/subscribers`,
        { email }
      );
      toast.success("Subscribed successfully!");
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      if (error.response?.data?.message === "Email already subscribed") {
        toast("You're already subscribed 🎉");
      } else {
        toast.error("Subscription failed");
        console.error(error); // ← only log unexpected errors, not "already subscribed"
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20">

        {/* ── Newsletter Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 pb-14 border-b border-white/[0.06]"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
                Stay Updated
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Insights on video creation{" "}
                <span className="text-zinc-400">&amp; storytelling.</span>
              </h2>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 focus:border-white/30 text-white placeholder-zinc-600 text-sm outline-none transition-colors duration-200 backdrop-blur-sm"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 bg-white text-zinc-950 text-sm font-semibold rounded-xl hover:bg-zinc-100 transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap"
              >
                Subscribe
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </form>

            {isSubscribed && (
              <p className="text-green-400 text-xs font-mono tracking-wide mt-2 lg:col-start-2">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-12 gap-10 mb-14"
        >
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="/#home" className="inline-block mb-3">
              <h2 className="text-2xl font-black tracking-tight">
                RICHA<span className="text-zinc-500">.EDITS</span>
              </h2>
            </a>
            <div className="h-px w-10 bg-white/20 mb-4" />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Transforming raw footage into compelling visual stories for creators and brands.
            </p>
          </div>

          {/* Navigate */}
          <div className="md:col-span-4">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-5 select-none">
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 w-fit"
                >
                  <span className="w-4 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-white/40 transition-all duration-300" />
                  {name}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-5 select-none">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-3 w-fit"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/60 border border-white/[0.08] group-hover:border-white/20 transition-colors duration-200">
                    <Icon className="text-zinc-500 group-hover:text-white text-sm transition-colors duration-200" />
                  </div>
                  <span className="text-sm text-zinc-500 group-hover:text-white transition-colors duration-200">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-zinc-600 tracking-wide select-none">
            © {new Date().getFullYear()} Richa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors duration-200 tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;