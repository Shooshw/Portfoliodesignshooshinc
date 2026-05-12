import { useState, useRef, useEffect } from "react";
import { Calendar, Mail, MessageCircle, Check, Send } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface ContactMenuProps {
  variant?: "desktop" | "mobile";
}

export function ContactMenu({ variant = "desktop" }: ContactMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const whatsapp = "5511997589393";
  const whatsappDisplay = "(11) 99758-9393";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}`, "_blank");
    setIsOpen(false);
  };

  const handleContactPage = () => {
    navigate("/contact");
    setIsOpen(false);
  };

  const handleCalendar = () => {
    window.open("https://cal.com/shoosh", "_blank");
    setIsOpen(false);
  };

  const bg = isDark ? "bg-[#111111]/95" : "bg-white/95";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const textMain = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/50" : "text-[#0D0D0D]/50";
  const hoverBg = isDark ? "hover:bg-[#F2F2F0]/5" : "hover:bg-[#0D0D0D]/5";

  if (variant === "desktop") {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.65rem] font-bold tracking-widest uppercase transition-all active:scale-95 ${
            isDark ? "bg-[#F2F2F0] text-[#0D0D0D]" : "bg-[#0D0D0D] text-[#F5F5F3]"
          }`}
        >
          <Calendar size={14} />
          {t("header.meeting")}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute right-0 mt-3 w-72 rounded-2xl p-2 shadow-2xl border backdrop-blur-xl z-50 transition-colors ${bg} ${border}`}
            >
              <button
                onClick={handleContactPage}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left group ${hoverBg}`}
              >
                <div className={`p-2 rounded-lg ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <Send size={16} className={`transition-colors group-hover:text-[#C8392B] ${textMuted}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${textMain}`}>
                    {t("contact.contactPage") || "Formulário de contato"}
                  </p>
                </div>
              </button>

              <button
                onClick={handleWhatsApp}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left mt-1 group ${hoverBg}`}
              >
                <div className={`p-2 rounded-lg ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <MessageCircle size={16} className={`transition-colors group-hover:text-[#C8392B] ${textMuted}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${textMain}`}>
                    {t("contact.whatsapp") || "WhatsApp"}
                  </p>
                  <p className={`text-[0.65rem] mt-0.5 ${textMuted}`}>{whatsappDisplay}</p>
                </div>
              </button>

              <button
                onClick={handleCalendar}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left mt-1 group ${hoverBg}`}
              >
                <div className={`p-2 rounded-lg ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <Calendar size={16} className={`transition-colors group-hover:text-[#C8392B] ${textMuted}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${textMain}`}>
                    {t("contact.calcom") || "Agendar reunião"}
                  </p>
                  <p className={`text-[0.65rem] mt-0.5 ${textMuted}`}>via Cal.com</p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Mobile Variant (Bottom Popover)
  return (
    <div className="w-full relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-sans text-xs font-bold tracking-[0.15em] uppercase border transition-all active:scale-95 shadow-lg ${
          isDark ? "bg-[#F2F2F0]/5 border-[#F2F2F0]/10 text-[#F2F2F0]" : "bg-white border-[#0D0D0D]/10 text-[#0D0D0D]"
        }`}
      >
        <Calendar size={16} />
        {t("header.meeting")}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-full left-0 right-0 mb-4 rounded-[2rem] p-3 shadow-2xl border backdrop-blur-2xl z-50 ${bg} ${border}`}
          >
            <button
              onClick={handleContactPage}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left ${hoverBg}`}
            >
              <Send size={18} className={textMuted} />
              <span className={`text-[0.9rem] font-semibold ${textMain}`}>
                {t("contact.contactPage") || "Formulário de contato"}
              </span>
            </button>

            <button
              onClick={handleWhatsApp}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left mt-1 ${hoverBg}`}
            >
              <MessageCircle size={18} className={textMuted} />
              <div className="flex-1">
                <p className={`text-[0.9rem] font-semibold ${textMain}`}>
                  {t("contact.whatsapp") || "WhatsApp"}
                </p>
                <p className={`text-[0.7rem] ${textMuted}`}>{whatsappDisplay}</p>
              </div>
            </button>

            <button
              onClick={handleCalendar}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left mt-1 ${hoverBg}`}
            >
              <Calendar size={18} className={textMuted} />
              <div className="flex-1">
                <p className={`text-[0.9rem] font-semibold ${textMain}`}>
                  {t("contact.calcom") || "Agendar reunião"}
                </p>
                <p className={`text-[0.7rem] ${textMuted}`}>via Cal.com</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}