import { motion } from "framer-motion";
import { Clapperboard, Scissors, Film, Sparkles, ArrowUpRight } from "lucide-react";

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
const SERVICES = [
  {
    id: 1,
    icon: Clapperboard,
    title: "YouTube Video Editing",
    category: "Long Form",
    tag: "01",
    description:
      "Professional long-form edits designed to improve viewer retention and cinematic storytelling.",
    accentColor: "rgba(59,130,246,0.12)",
    borderHover: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    id: 2,
    icon: Film,
    title: "Short Form Content",
    category: "Short Form",
    tag: "02",
    description:
      "Hook-first Reels, Shorts, and TikToks engineered for maximum reach and algorithmic push.",
    accentColor: "rgba(168,85,247,0.12)",
    borderHover: "hover:border-purple-500/30",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    id: 3,
    icon: Scissors,
    title: "Commercial Editing",
    category: "Commercial",
    tag: "03",
    description:
      "Story-driven brand films that communicate value precisely and convert viewers into customers.",
    accentColor: "rgba(236,72,153,0.12)",
    borderHover: "hover:border-pink-500/30",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Motion Graphics",
    category: "Animation",
    tag: "04",
    description:
      "Frame-precise animated titles, transitions, and effects with intentional kinetic language.",
    accentColor: "rgba(245,158,11,0.12)",
    borderHover: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
];

// ─── Isolated Service Card ───
const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={CARD_ITEM}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group h-full"
    >
      <div
        className={`relative flex flex-col h-full bg-zinc-900/60 border border-white/[0.08] ${service.borderHover} rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300 cursor-pointer`}
      >
        {/* Subtle accent glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at top left, ${service.accentColor}, transparent 70%)` }}
        />

        {/* ── Header Strip ── */}
        <div className="relative flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
          {/* Numbered tag */}
          <span className="text-[10px] font-mono font-medium text-white/30 tracking-[0.2em] select-none self-end">
            {service.tag}
          </span>

          {/* Icon container */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${service.iconBg} border border-white/[0.08] group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-5 h-5 ${service.iconColor}`} />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="relative flex flex-col flex-grow p-5 gap-3">
          {/* Category pill */}
          <span className="self-start px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-medium text-white/50 tracking-wide">
            {service.category}
          </span>

          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-white/80 transition-colors duration-200">
            {service.title}
          </h3>

          <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
            {service.description}
          </p>

          {/* CTA row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-xs font-medium text-zinc-500 group-hover:text-white/60 transition-colors duration-200 tracking-wide">
              Learn More
            </span>
            <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Bottom CTA ───
const BottomCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="mt-16 md:mt-20"
  >
    <div className="relative max-w-2xl mx-auto">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
      />

      <div className="relative rounded-2xl border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm px-8 py-10 md:py-12 text-center">
        {/* Mono label */}
        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 select-none">
          Not sure where to start?
        </p>

        <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 tracking-tight">
          Let's build something{" "}
          <span className="text-zinc-400">together.</span>
        </h3>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
          Discuss your project requirements and find the perfect editing solution tailored for your content.
        </p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-zinc-950 text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-colors duration-200"
        >
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

// ─── Main Section ───
const Services = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
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
            Services
          </motion.p>

          <motion.h2
            id="services-heading"
            custom={0.05}
            variants={FADE_UP}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4"
          >
            Built for{" "}
            <span className="text-zinc-400">every format.</span>
          </motion.h2>

          <motion.p
            custom={0.12}
            variants={FADE_UP}
            className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md"
          >
            High-quality editing solutions tailored for creators, brands, and businesses — across every platform and format.
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
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <BottomCTA />

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-10 tracking-wide select-none"
        >
          All projects delivered with full revision rounds and client collaboration.
        </motion.p>

      </div>
    </section>
  );
};

export default Services;