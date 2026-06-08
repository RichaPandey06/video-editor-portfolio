import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const ProjectTemplate = ({ title, category, duration, tools, overview, services, results, video }) => {
  return (
    <section className="relative bg-zinc-950 text-white min-h-screen py-24 md:py-36 overflow-hidden">
      {/* Grid texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div initial="hidden" animate="visible" className="mb-12 md:mb-16">
          <motion.p custom={0} variants={FADE_UP} className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
            Project
          </motion.p>
          <motion.h1 custom={0.05} variants={FADE_UP} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            {title}
          </motion.h1>
        </motion.div>

        {/* ── Meta strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="grid grid-cols-3 gap-3 md:gap-4 mb-12"
        >
          {[
            { label: "Category", value: category },
            { label: "Duration", value: duration },
            { label: "Tools", value: tools },
          ].map((item) => (
            <div key={item.label} className="flex flex-col bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-2 select-none">{item.label}</p>
              <p className="text-sm text-white font-medium leading-snug">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Overview ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-6 md:p-8 backdrop-blur-sm mb-6"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">Project Overview</p>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{overview}</p>
        </motion.div>

        {/* ── Services + Results ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="grid md:grid-cols-2 gap-4 md:gap-5 mb-6"
        >
          {/* Services */}
          <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-5 select-none">Services Provided</p>
            <ul className="flex flex-col gap-3">
              {services.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div className="bg-zinc-900/60 border border-white/[0.08] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-5 select-none">Results</p>
            <ul className="flex flex-col gap-3">
              {results.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Video ── */}

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
            <video
              src={video?.replace("/upload/", "/upload/q_auto,f_auto/")}
              controls
              preload="metadata"
              className="w-full block"
            />
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
        >
          All work is client-approved and NDA-compliant where applicable.
        </motion.p>

      </div>
    </section>
  );
};

export default ProjectTemplate;