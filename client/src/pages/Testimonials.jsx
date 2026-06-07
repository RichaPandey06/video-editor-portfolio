import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

// ─── Static data outside component ───
const TESTIMONIALS = [
  {
    id: 1,
    name: "Aman Sharma",
    role: "YouTube Creator",
    review:
      "Excellent editing quality and attention to detail. The final video exceeded expectations.",
    rating: 5,
    initials: "AS",
    tag: "01",
    accentColor: "rgba(168,85,247,0.1)",
    borderHover: "hover:border-purple-500/30",
    avatarBg: "bg-purple-500/15",
    avatarText: "text-purple-300",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Brand Owner",
    review:
      "Professional communication, fast delivery and high-quality edits. Would absolutely work with again.",
    rating: 5,
    initials: "PV",
    tag: "02",
    accentColor: "rgba(59,130,246,0.1)",
    borderHover: "hover:border-blue-500/30",
    avatarBg: "bg-blue-500/15",
    avatarText: "text-blue-300",
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Content Creator",
    review:
      "Audience retention improved noticeably after working with Richa. The results speak for themselves.",
    rating: 5,
    initials: "RS",
    tag: "03",
    accentColor: "rgba(236,72,153,0.1)",
    borderHover: "hover:border-pink-500/30",
    avatarBg: "bg-pink-500/15",
    avatarText: "text-pink-300",
  },
];

const STATS = [
  { value: "50+", label: "Happy Clients" },
  { value: "200+", label: "Videos Edited" },
  { value: "★ 4.9", label: "Avg Rating" },
];

// ─── Isolated Testimonial Card ───
const TestimonialCard = ({ item }) => (
  <motion.div
    variants={CARD_ITEM}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group h-full"
  >
    <div
      className={`relative flex flex-col h-full bg-zinc-900/60 border border-white/[0.08] ${item.borderHover} rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300`}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${item.accentColor}, transparent 70%)`,
        }}
      />

      {/* ── Header Strip ── */}
      <div className="relative flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
        {/* Numbered tag */}
        <span className="text-[10px] font-mono font-medium text-white/30 tracking-[0.2em] select-none">
          {item.tag}
        </span>

        {/* Stars */}
        <div className="flex gap-0.5">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative flex flex-col flex-grow p-5 gap-4">
        {/* Review text */}
        <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
          "{item.review}"
        </p>

        {/* CTA row / Author */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full ${item.avatarBg} border border-white/[0.08] flex items-center justify-center flex-shrink-0`}
            >
              <span className={`text-[11px] font-semibold ${item.avatarText} select-none`}>
                {item.initials}
              </span>
            </div>

            {/* Name & Role */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">
                {item.name}
              </p>
              <p className="text-[11px] text-zinc-500 tracking-wide">
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Stats Strip ───
const StatsStrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="mt-10 md:mt-14"
  >
    <div className="grid grid-cols-3 gap-4 md:gap-5">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center py-6 px-4 bg-zinc-900/60 border border-white/[0.08] rounded-2xl backdrop-blur-sm"
        >
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {stat.value}
          </p>
          <p className="text-[11px] font-mono text-zinc-500 tracking-[0.15em] uppercase mt-1.5 select-none">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

// ─── Main Section ───
const Testimonials = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
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
            Client Reviews
          </motion.p>

          <motion.h2
            id="reviews-heading"
            custom={0.05}
            variants={FADE_UP}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            What clients{" "}
            <span className="text-zinc-400">say.</span>
          </motion.h2>

          <motion.p
            custom={0.12}
            variants={FADE_UP}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            Feedback from creators and businesses who trusted the process — and came back.
          </motion.p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ── Stats ── */}
        <StatsStrip />

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
        >
          Reviews collected from real clients across YouTube, Instagram, and direct projects.
        </motion.p>

      </div>
    </section>
  );
};

export default Testimonials;