import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";

// ─── Animation variants outside component ───
const EASE = [0.22, 1, 0.36, 1];
import API_URL from "../../config/api";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const CARD_ITEM = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ─── Project Card ───
const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={CARD_ITEM}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group h-full"
  >
    <div className="relative flex flex-col h-full bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300">

      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-zinc-950 h-48 flex-shrink-0">
        // ✅ After
        <img
          src={project.thumbnail?.replace("/upload/", "/upload/q_auto,f_auto,w_600/")}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Index tag */}
        <span className="absolute top-3 left-3 text-[10px] font-mono font-medium text-white/40 tracking-[0.2em] select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category pill */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/70 tracking-wide border border-white/10">
          {project.category}
        </span>

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <h3 className="text-base font-semibold text-white leading-snug group-hover:text-white/80 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-zinc-500 group-hover:text-white/60 transition-colors duration-200 tracking-wide"
          >
            Watch Video
          </a>
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300"
            aria-label={`Watch ${project.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Empty State ───
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: EASE }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="w-14 h-14 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-center mb-5">
      <PlayCircle className="w-6 h-6 text-zinc-600" />
    </div>
    <p className="text-zinc-500 text-sm font-mono tracking-[0.15em] uppercase select-none">
      No projects yet
    </p>
  </motion.div>
);

// ─── Skeleton loader ───
const SkeletonCard = () => (
  <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-zinc-800/60" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-zinc-800/60 rounded-full w-3/4" />
      <div className="h-3 bg-zinc-800/40 rounded-full w-full" />
      <div className="h-3 bg-zinc-800/40 rounded-full w-5/6" />
    </div>
  </div>
);

// ─── Main Section ───
const YoutubeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/project/category/YouTube`
        );
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="youtube-projects"
      aria-labelledby="youtube-heading"
      className="relative bg-zinc-950 text-white min-h-screen py-24 md:py-36 overflow-hidden"
    >
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="mb-10 md:mb-14 max-w-xl"
        >
          <motion.p
            custom={0}
            variants={FADE_UP}
            className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none"
          >
            YouTube Projects
          </motion.p>

          <motion.h1
            id="youtube-heading"
            custom={0.05}
            variants={FADE_UP}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            Long-form{" "}
            <span className="text-zinc-400">storytelling.</span>
          </motion.h1>

          <motion.p
            custom={0.12}
            variants={FADE_UP}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            Documentaries, branded content, and YouTube edits built for retention and audience depth.
          </motion.p>
        </motion.div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}

        {/* Footer note */}
        {projects.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
          >
            All work is client-approved and NDA-compliant where applicable.
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default YoutubeProjects;