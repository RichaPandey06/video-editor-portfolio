import { Mail, Phone, Loader } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API_URL from "../config/api";
// ─── Animation variants defined OUTSIDE component ───
const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const CARD_ITEM = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Static contact links ───
const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "Contactrichanow@gmail.com",
    href: "mailto:Contactrichanow@gmail.com",
    tag: "01",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7061939459",
    href: "tel:+917061939459",
    tag: "02",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@richaedits",
    href: "https://instagram.com/richaedit",
    tag: "03",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    value: "RichaPandeyEdits",
    href: "https://youtube.com/@RichaPandeyEdits",
    tag: "04",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "Richa Pandey",
    href: "https://linkedin.com/in/richa-pandey-676a78414",
    tag: "05",
  },
];

// ─── Input field component ───
const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-xs mt-1.5">{error}</p>
    )}
  </div>
);

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!message.trim()) newErrors.message = "Message is required";
    else if (message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors");
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await axios.post(
  `${API_URL}/contact`,{ name, email, message });
      toast.success("Message sent successfully!");
      setName(""); setEmail(""); setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-zinc-900/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200 backdrop-blur-sm";
  const inputNormal =
    "border-white/[0.08] hover:border-white/20 focus:border-white/30";
  const inputError =
    "border-red-500/40 bg-red-500/5";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-zinc-950 text-white py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 md:mb-14 max-w-xl"
        >
          <motion.p
            custom={0}
            variants={FADE_UP}
            className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none"
          >
            Contact
          </motion.p>

          <motion.h2
            id="contact-heading"
            custom={0.05}
            variants={FADE_UP}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            Let's make something{" "}
            <span className="text-zinc-400">people watch.</span>
          </motion.h2>

          <motion.p
            custom={0.12}
            variants={FADE_UP}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            Ready to bring your vision to life? Get in touch and let's create something worth watching.
          </motion.p>
        </motion.div>

        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-2 gap-5"
        >

          {/* ── Contact Info Card ── */}
          <motion.div
            variants={CARD_ITEM}
            className="flex flex-col bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            {/* Header strip */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] select-none">
                Contact Info
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 tracking-wide select-none">
                  Available
                </span>
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-col flex-grow p-5 gap-2">
              {CONTACT_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.tag}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex-shrink-0 group-hover:border-white/20 transition-colors duration-200">
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-zinc-600 tracking-[0.15em] uppercase select-none">
                        {item.label}
                      </p>
                      <p className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200 truncate">
                        {item.value}
                      </p>
                    </div>
                    <span className="ml-auto text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors duration-200 select-none">
                      {item.tag}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-5 pb-5">
              <p className="text-[11px] text-zinc-600 tracking-wide select-none">
                Usually responds within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* ── Contact Form ── */}
          <motion.div
            variants={CARD_ITEM}
            className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            {/* Header strip */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] select-none">
                Send a Message
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
              <Field label="Your Name" error={errors.name}>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                />
              </Field>

              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                />
              </Field>

              <Field label="Project Details" error={errors.message}>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
              </Field>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors duration-200 ${
                  loading
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.06]"
                    : "bg-white text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              <p className="text-center text-[11px] text-zinc-600 tracking-wide select-none">
                We'll get back to you as soon as possible.
              </p>
            </form>
          </motion.div>

        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
        >
          All inquiries are responded to within 24 hours.
        </motion.p>

      </div>
    </section>
  );
};

export default Contact;