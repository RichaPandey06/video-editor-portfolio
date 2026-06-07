import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import istockVideo from "../assets/videos/profile.mp4";

// ─── Easing — custom cubic-bezier, not generic "easeOut" ───
const EASE = [0.22, 1, 0.36, 1];

// ─── Stagger container — one source of truth for all children ───
const CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

// ─── Shared child variant — used by every animated element ───
const CHILD = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// ─── Heading lines use a mask-reveal (clip) variant ───
const REVEAL = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

// ─── Stats data ───
const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "1M+", label: "Views Generated" },
  { value: "2+", label: "Years Experience" },
];

// ─── Stat item ───
const StatItem = ({ value, label }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight tabular-nums">
      {value}
    </span>
    <span className="text-xs text-zinc-500 tracking-wide">{label}</span>
  </div>
);

const Hero = () => {
  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen bg-zinc-950 text-white flex items-center pt-20 overflow-hidden"
    >
      {/* ── Background grid texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Radial vignette — pulls focus to center ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── Left: Text content ── */}
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Role badge */}
            <motion.div variants={CHILD} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/[0.06] border border-white/[0.09] text-zinc-400 text-xs font-medium tracking-wide">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse"
                />
                Professional Video Editor
              </span>
            </motion.div>

            {/* Heading — line-by-line mask reveal */}
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.04] tracking-tight mb-6">
              <span className="block overflow-hidden">
                <motion.span variants={REVEAL} className="block text-white">
                  Crafting Videos
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={REVEAL}
                  transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
                  className="block text-white"
                >
                  That{" "}
                  <span className="text-zinc-400 font-light italic">
                    Capture
                  </span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={REVEAL}
                  transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
                  className="block text-white"
                >
                  Attention.
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={CHILD}
              className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg mb-8"
            >
              I help creators, brands, and businesses turn raw footage into
              high-retention videos that grow audiences and drive conversions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={CHILD}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <HashLink
                smooth
                to="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 active:scale-[0.97] transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                View My Work
                <ArrowRight size={15} strokeWidth={2.5} />
              </HashLink>

              <HashLink
                smooth
                to="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/[0.12] text-zinc-300 text-sm font-medium hover:border-white/25 hover:text-white hover:bg-white/[0.04] active:scale-[0.97] transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Hire Me
              </HashLink>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={CHILD}>
              <div className="flex items-start gap-8 sm:gap-10 pt-6 border-t border-white/[0.07]">
                {STATS.map((stat) => (
                  <StatItem key={stat.label} {...stat} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Video ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            {/* Ambient glow — radial-gradient is sharper and more controllable than blur-3xl */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />

            {/* Floating label — top-left, adds editorial feel */}
            <div className="absolute -top-3 left-4 z-10 px-3 py-1 rounded-md bg-zinc-900 border border-white/[0.08] text-[10px] font-mono text-zinc-500 tracking-widest uppercase select-none">
              Showreel 2026
            </div>

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-900 shadow-2xl shadow-black/60">
              <video
                src={istockVideo}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Video editor showreel"
                className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] object-cover block"
              />

              {/* Bottom metadata bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase select-none">
                  ● Playing
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                </div>
              </div>
            </div>

            {/* Corner accent lines — geometric detail */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 w-12 h-12 pointer-events-none"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.12)",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "0 0 8px 0",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;