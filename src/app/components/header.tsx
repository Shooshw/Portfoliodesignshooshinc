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

  const textPrimary = "text-[#F2F2F0]";
  const textMuted = "text-[#F2F2F0]/60";
  const pillBg = "bg-white/5 hover:bg-white/10";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-700 pointer-events-none">
      <div className="w-full pointer-events-auto bg-[#0a0a0a]/70 backdrop-blur-xl">
        
        {/* Main Header Row */}
        <div className="mx-auto w-full max-w-[1500px] flex items-center justify-between px-6 lg:px-12 py-4">
          
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
              <span className={`font-display font-semibold italic text-xl md:text-2xl leading-none tracking-tighter transition-colors group-hover:text-white ${textPrimary}`}>
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
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-[0.8rem] font-medium transition-all ${pillBg} ${textPrimary} whitespace-nowrap`}
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
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[0.7rem] font-bold uppercase transition-all ${pillBg} ${textPrimary}`}
              aria-label={t("header.language") || "Language toggler"}
            >
              <Globe size={16} className="opacity-70" />
              <span className="opacity-90">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 hidden sm:flex rounded-full transition-all ${pillBg} ${textPrimary}`}
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