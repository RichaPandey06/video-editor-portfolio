import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import iframVideo from "../../assets/videos/ifram.mp4";

// ─── Animation variants defined OUTSIDE component to prevent re-creation on render ───
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

// ─── Static data outside component — no rebuild on re-render ───
const CATEGORIES = [
  {
    id: 1,
    title: "YouTube Projects",
    category: "Long Form",
    tag: "01",
    link: "/youtube-projects",
    description: "Cinematic long-form content built for retention and brand depth.",
  },
  {
    id: 2,
    title: "Instagram Projects",
    category: "Short Form",
    tag: "02",
    link: "/instagram-projects",
    description: "Hook-first vertical edits engineered for the algorithm.",
  },
  {
    id: 3,
    title: "Brand Commercials",
    category: "Commercial",
    tag: "03",
    link: "/brand-commercials",
    description: "Story-driven brand films that convert viewers into customers.",
  },
  {
    id: 4,
    title: "Motion Graphics",
    category: "Animation",
    tag: "04",
    link: "/motion-graphics",
    description: "Frame-precise animations with intentional kinetic language.",
  },
];

// ─── Isolated video card — prevents parent re-render cascade ───
const WorkCard = ({ project }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <motion.div
      variants={CARD_ITEM}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group h-full"
    >
      <Link
        to={project.link}
        aria-label={`View ${project.title} projects`}
        className="flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl"
      >
        <div className="relative flex flex-col h-full bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300 cursor-pointer">

          {/* ── Video Thumbnail ── */}
          <div
            className="relative overflow-hidden bg-zinc-950 h-44 sm:h-52 flex-shrink-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              src={iframVideo}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle dark scrim — always present, deepens on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />

            {/* Numbered tag — top-left */}
            <span className="absolute top-3 left-3 text-[10px] font-mono font-medium text-white/40 tracking-[0.2em] select-none">
              {project.tag}
            </span>

            {/* Category pill — top-right */}
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/70 tracking-wide border border-white/10">
              {project.category}
            </span>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-grow p-5 gap-3">
            <h3 className="text-base font-semibold text-white leading-snug group-hover:text-white/80 transition-colors duration-200">
              {project.title}
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-medium text-zinc-500 group-hover:text-white/60 transition-colors duration-200 tracking-wide">
                View Projects
              </span>
              <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ─── Showreel with parallax scroll ───
const Showreel = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 0.97]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 md:mb-20"
    >
      {/* Label above */}
      <p className="text-center text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
        Showreel — 2026
      </p>

      <div className="relative max-w-2xl mx-auto">
        {/* Ambient glow — purely decorative, no hover jank */}
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
        />

        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
          <motion.div style={{ scale }}>
            <video
              src={iframVideo}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Editor showreel"
              className="w-full max-h-[220px] sm:max-h-[320px] md:max-h-[380px] object-cover block"
            />
          </motion.div>

          {/* Bottom caption bar */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-[11px] text-white/50 font-mono tracking-widest uppercase select-none">
              ● Live
            </span>
            <span className="text-[11px] text-white/40 font-medium tracking-wide select-none">
              Full portfolio below
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ───
const Work = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
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

        {/* ── Showreel ── */}
        <Showreel />

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
            Selected Work
          </motion.p>

          <motion.h2
            id="work-heading"
            custom={0.05}
            variants={FADE_UP}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            Crafted with{" "}
            <span className="text-zinc-400">intention.</span>
          </motion.h2>

          <motion.p
            custom={0.12}
            variants={FADE_UP}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            Every frame is deliberate. Explore work across formats — from long-form narratives to
            sub-second micro-edits.
          </motion.p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {CATEGORIES.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
        >
          All work is client-approved and NDA-compliant where applicable.
        </motion.p>

      </div>
    </section>
  );
};

export default Work;