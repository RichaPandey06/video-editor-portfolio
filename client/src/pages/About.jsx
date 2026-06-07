import { motion } from "framer-motion";
import { Film, Sparkles, Image, MonitorPlay, Smartphone, PlayCircle } from "lucide-react";


// ─── Animation variants outside component ───
const EASE = [0.22, 1, 0.36, 1];

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
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const CHIP = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

// ─── Static data ───
const SKILLS = [
  { id: "premiere",     icon: Film,        label: "Premiere Pro",    accent: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
  { id: "aftereffects", icon: Sparkles,    label: "After Effects",   accent: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  { id: "photoshop",    icon: Image,       label: "Photoshop",       accent: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
  { id: "davinci",      icon: MonitorPlay, label: "DaVinci Resolve", accent: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
  { id: "shortform",    icon: Smartphone,  label: "Short Form",      accent: "bg-pink-500/10 text-pink-300 border-pink-500/20" },
  { id: "longform",     icon: PlayCircle,  label: "Long Form",       accent: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
];

const STATS = [
  { value: "6+",  label: "Tools" },
  { value: "50+", label: "Projects" },
  { value: "4",   label: "Formats" },
  { value: "24h", label: "Turnaround" },
];

// ─── About Section ───
const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-zinc-950 text-white py-24 md:py-36 overflow-hidden"
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Image + Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
              About — Editor
            </p>

            {/* Profile image */}
            <div className="relative mb-5">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
              />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-900/60 backdrop-blur-sm">
                <img
                 src="/profile.png" alt="Profile"
                  className="w-full h-72 sm:h-80 object-cover block"
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[11px] text-white/50 font-mono tracking-widest uppercase select-none">
                      Available
                    </span>
                  </span>
                  <span className="text-[11px] text-white/40 font-medium tracking-wide select-none">
                    Open to freelance
                  </span>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-2.5">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-3.5 bg-zinc-900/60 border border-white/[0.08] rounded-xl"
                >
                  <p className="text-base font-bold text-white tabular-nums tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-600 tracking-[0.1em] uppercase mt-1 select-none">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Text + Skills ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              custom={0}
              variants={FADE_UP}
              className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none"
            >
              Who I Am
            </motion.p>

            <motion.h2
              id="about-heading"
              custom={0.05}
              variants={FADE_UP}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Turning ideas into{" "}
              <span className="text-zinc-400">engaging content.</span>
            </motion.h2>

            <motion.p
              custom={0.1}
              variants={FADE_UP}
              className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4"
            >
              I'm a passionate video editor focused on creating content that captures
              attention and keeps audiences engaged. From YouTube videos and commercials
              to social media content, I help creators and brands tell compelling stories
              through professional editing.
            </motion.p>

            <motion.p
              custom={0.15}
              variants={FADE_UP}
              className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10"
            >
              My approach combines storytelling, pacing, motion graphics, sound design,
              and color grading to create content that delivers results.
            </motion.p>

            {/* ── Skills chips ── */}
            <motion.div custom={0.2} variants={FADE_UP}>
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
                Tools & Expertise
              </p>

              <motion.div
                variants={STAGGER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {SKILLS.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.span
                      key={skill.id}
                      variants={CHIP}
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide cursor-default select-none ${skill.accent}`}
                    >
                      <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                      {skill.label}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;