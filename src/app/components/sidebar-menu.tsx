import { User, FolderOpen, Mail, FileText, HelpCircle, Linkedin, Instagram, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { useLocation, useNavigate, Link } from "react-router";
import { useSidebar } from "../contexts/sidebar-context";
import { useTheme } from "../contexts/theme-context";

const navItems = (t: (k: string) => string) => [
  { icon: User, label: t("sidebar.about"), section: "about-intro" },
  { icon: FolderOpen, label: t("sidebar.projects"), section: "projects" },
];

const socialItems = [
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "https://linkedin.com/in/pedro-oliveira-55a3b123a",
    ariaLabel: "LinkedIn profile"
  },
  { 
    icon: Instagram, 
    label: "Instagram", 
    href: "https://instagram.com/shoosh.inc_studio",
    ariaLabel: "Instagram profile"
  },
  { 
    icon: Phone, 
    label: "WhatsApp", 
    href: "https://wa.me/5511997589393",
    ariaLabel: "WhatsApp contact"
  },
  { 
    icon: Mail, 
    label: "E-mail", 
    href: "mailto:pedroolip13@gmail.com",
    ariaLabel: "Send email"
  },
];

const linkItems = (t: (k: string) => string) => [
  { icon: FileText, label: t("sidebar.cv"), to: "/cv" },
  { icon: HelpCircle, label: t("sidebar.faq"), to: "/faq" },
  { icon: Mail, label: t("sidebar.contact"), to: "/contact" },
];

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const sideBg = isDark ? "bg-black" : "bg-[#F5F5F3]";
  const sideBorder = isDark ? "border-white/10" : "border-[#0D0D0D]/10";
  const textPrimary = isDark ? "text-white" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-white/40" : "text-[#0D0D0D]/40";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-black/5";
  const surface = isDark ? "bg-white/3" : "bg-black/3";

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent('close-modals'));
    document.body.style.overflow = "";

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.aside
        initial={{ x: -400 }}
        animate={{ x: isOpen ? 0 : -400 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        data-lenis-prevent
        className={`fixed left-0 top-0 h-full w-[360px] z-[200] pt-24 overflow-y-auto border-r shadow-2xl transition-shadow duration-700 ${sideBg} ${sideBorder} ${
          isOpen ? (isDark ? "shadow-black" : "shadow-black/5") : ""
        }`}
      >
        {/* Top accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C8392B]" />

        <div className="p-8 space-y-12">
          
          {/* Logo in sidebar */}
           <div className="mb-12 px-2">
              <span className={`font-display font-semibold italic text-3xl tracking-tighter ${textPrimary}`}>
                Shoosh.inc
              </span>
           </div>

          {/* Navigation Group */}
          <nav className="space-y-2">
            <p className={`px-4 mb-6 text-[0.6rem] font-bold tracking-[0.4em] uppercase opacity-20 ${textPrimary}`}>
              ✦ Menu
            </p>
            {navItems(t).map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 6 }}
                onClick={() => {
                  if ('section' in item) scrollToSection(item.section);
                }}
                className={`w-full flex items-center gap-5 px-6 py-4 rounded-[2rem] text-left transition-all group ${textMuted} ${hoverBg}`}
              >
                <item.icon size={20} className="transition-colors group-hover:text-[#C8392B]" />
                <span className={`font-sans text-sm font-bold tracking-wide transition-colors group-hover:text-current`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* External Links Group */}
          <nav className="space-y-2">
             <p className={`px-4 mb-6 text-[0.6rem] font-bold tracking-[0.4em] uppercase opacity-20 ${textPrimary}`}>
              ✦ Navigation
            </p>
            {linkItems(t).map((item, i) => {
              const isActive = location.pathname === item.to;
              return (
                <motion.div key={i} whileHover={{ x: 6 }}>
                  <Link
                    to={item.to}
                    onClick={() => {
                       window.dispatchEvent(new CustomEvent('close-modals'));
                       setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-5 px-6 py-4 rounded-[2rem] transition-all group ${
                      isActive ? `bg-[#C8392B] text-white shadow-xl shadow-[#C8392B]/20` : `${textMuted} ${hoverBg}`
                    }`}
                  >
                    <item.icon size={20} className={isActive ? "text-white" : "group-hover:text-[#C8392B] transition-colors"} />
                    <span className="font-sans text-sm font-bold tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Socials & Networking */}
          <div className={`p-8 rounded-[3rem] border ${surface} ${sideBorder}`}>
             <p className={`mb-6 text-[0.6rem] font-bold tracking-[0.4em] uppercase opacity-20 ${textPrimary}`}>
              ✦ Connect
            </p>
            <div className="grid grid-cols-4 gap-3">
              {socialItems.map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className={`flex items-center justify-center aspect-square rounded-2xl transition-all ${textMuted} ${hoverBg} hover:text-[#C8392B] hover:bg-[#C8392B]/5`}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="pb-12 text-center lg:text-left px-4">
            <div className="w-10 h-px bg-[#C8392B] mb-8 mx-auto lg:mx-0 opacity-40" />
            <p className={`italic leading-relaxed font-sans text-xs italic tracking-wide ${textMuted}`}>
              "{t("sidebar.quote")}"
            </p>
            <p className={`mt-4 font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase opacity-20 ${textPrimary}`}>
              — {t("sidebar.quoteAuthor")}
            </p>
          </div>

        </div>
      </motion.aside>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[150] backdrop-blur-md bg-black/40"
      />
    </>
  );
}