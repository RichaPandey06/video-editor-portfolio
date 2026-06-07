import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav links use absolute paths (/#section) so they work from ANY route ───
const NAV_LINKS = [
  { name: "Home",     href: "/#home" },
  { name: "Work",     href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "Reviews",  href: "/#reviews" },
  { name: "About",    href: "/#about" },
  { name: "Contact",  href: "/#contact" },
];

const MOBILE_MENU_VARIANTS = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  open:   { opacity: 1, height: "auto", transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

const MOBILE_LINK_VARIANTS = {
  closed: { opacity: 0, x: -12 },
  open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.04, ease: [0.22, 1, 0.36, 1] } }),
};

const ICON_VARIANTS = {
  initial: { rotate: -45, opacity: 0, scale: 0.8 },
  animate: { rotate: 0,   opacity: 1, scale: 1, transition: { duration: 0.18 } },
  exit:    { rotate: 45,  opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

// ─── Scroll listener only — no IntersectionObserver on sub-pages ───
function useNavState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled };
}

// ─── Logo ───
const Logo = () => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
    <a
      href="/#home"
      aria-label="Go to home"
      className="flex items-center gap-1.5 text-white font-black text-xl tracking-tighter select-none outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
    >
      RICHA<span className="text-zinc-400">.EDITS</span>
    </a>
  </motion.div>
);

// ─── Desktop nav link — plain <a> so /#section works from any route ───
const DesktopLink = ({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="relative px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 outline-none focus-visible:text-white rounded"
  >
    {link.name}
  </a>
);

// ─── Main Navbar ───
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useNavState();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLinkClick = useCallback(() => setIsOpen(false), []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top accent line */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Logo />

          {/* Desktop links */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center gap-0.5"
          >
            {NAV_LINKS.map((link) => (
              <DesktopLink key={link.name} link={link} onClick={handleLinkClick} />
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block"
          >
            <a
              href="/#contact"
              onClick={handleLinkClick}
              className="px-5 py-2.5 rounded-lg bg-white text-zinc-950 text-sm font-semibold tracking-tight hover:bg-zinc-100 active:scale-95 transition-all duration-150 inline-block outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Hire Me
            </a>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors duration-200 rounded outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="close" variants={ICON_VARIANTS} initial="initial" animate="animate" exit="exit">
                  <X size={22} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span key="open" variants={ICON_VARIANTS} initial="initial" animate="animate" exit="exit">
                  <Menu size={22} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              variants={MOBILE_MENU_VARIANTS}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden border-t border-white/[0.08] overflow-hidden"
            >
              <div className="flex flex-col gap-1 py-4 pb-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.name}
                    custom={index}
                    variants={MOBILE_LINK_VARIANTS}
                    initial="closed"
                    animate="open"
                  >
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={MOBILE_LINK_VARIANTS}
                  initial="closed"
                  animate="open"
                  className="pt-3 mt-2 border-t border-white/[0.06]"
                >
                  <a
                    href="/#contact"
                    onClick={handleLinkClick}
                    className="block px-4 py-3.5 rounded-lg bg-white text-zinc-950 font-semibold text-sm text-center hover:bg-zinc-100 active:scale-[0.98] transition-all duration-150"
                  >
                    Hire Me
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;