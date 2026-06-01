import { Link, useLocation, useNavigate } from "react-router";
import { Menu, Moon, Sun, User, FolderOpen, Mail, Globe, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { useSidebar } from "../contexts/sidebar-context";
import { useTheme } from "../contexts/theme-context";
import { ContactMenu } from "./contact-menu";

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { toggleSidebar } = useSidebar();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    window.dispatchEvent(new CustomEvent('close-modals'));
    document.body.style.overflow = "";

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { name: t("sidebar.about") || "Sobre Mim", href: "#about-intro", icon: User },
    { name: t("sidebar.projects") || "Projetos", href: "#projects", icon: FolderOpen },
    { name: t("header.cv") || "Currículo", href: "/cv", icon: FileText },
    { name: t("header.contact") || "Contato", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    window.dispatchEvent(new CustomEvent('close-modals'));
    document.body.style.overflow = "";

    const scrollToHash = (hash: string) => {
      const el = document.querySelector(hash);
      if (el) {
         const y = el.getBoundingClientRect().top + window.scrollY - 100;
         window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
         navigate('/');
         setTimeout(() => {
           scrollToHash(href);
         }, 300);
      } else {
         scrollToHash(href);
         window.history.pushState(null, '', href);
      }
    } else {
      navigate(href);
    }
  };

  const textPrimary = isDark ? "text-white" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-white/60" : "text-black/60";
  const pillBg = isDark ? "bg-white/5 hover:bg-white/15 border border-white/5" : "bg-black/5 hover:bg-black/10 border border-black/5";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent p-0 transition-all duration-700 pointer-events-none">
      <div className="w-full pointer-events-auto bg-transparent">
        
        {/* Main Header Row */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          
          {/* Left: Branding & Menu */}
          <div className="flex items-center gap-4 sm:gap-6 z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className={`p-1 sm:p-2 transition-colors group flex items-center justify-center lg:hidden`}
              aria-label="Toggle menu"
            >
              <Menu size={24} className={`${textMuted} group-hover:text-white transition-colors`} />
            </motion.button>

            <button onClick={handleReturnHome} className="flex flex-col select-none group text-left pt-0.5">
              <span className={`font-display font-semibold italic text-xl md:text-2xl leading-none tracking-tighter transition-all ${
                isDark ? "group-hover:text-[#3054ff]" : "group-hover:text-[#C8392B]"
              } ${textPrimary}`}>
                Shoosh.inc
              </span>
            </button>
          </div>
          
          {/* Right: Navigation Links & Controls */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            <nav className="hidden lg:flex items-center gap-2 mr-2">
              {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button 
                      key={link.name} 
                      onClick={() => handleNavClick(link.href)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-[0.8rem] font-medium transition-all ${pillBg} ${textPrimary} ${
                        isDark ? "hover:text-[#3054ff]" : "hover:text-[#C8392B]"
                      } whitespace-nowrap`}
                    >
                      <Icon size={16} className="opacity-70" />
                      {link.name}
                    </button>
                  );
              })}
            </nav>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[0.7rem] font-bold uppercase transition-all ${pillBg} ${textPrimary} ${
                isDark ? "hover:text-[#3054ff]" : "hover:text-[#C8392B]"
              }`}
              aria-label={t("header.language") || "Language toggler"}
            >
              <Globe size={16} className="opacity-70" />
              <span className="opacity-90">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 hidden sm:flex rounded-full transition-all ${pillBg} ${textPrimary} ${
                isDark ? "hover:text-[#3054ff]" : "hover:text-[#C8392B]"
              }`}
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun size={15} className="opacity-80" /> : <Moon size={15} className="opacity-80" />}
            </motion.button>
          </div>

        </div>
      </div>
    </header>
  );
}