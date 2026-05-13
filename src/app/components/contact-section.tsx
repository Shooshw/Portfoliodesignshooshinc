import { motion } from "motion/react";
import { Mail, Linkedin, MessageCircle, Send, ArrowUp, FileUser, Instagram, HelpCircle, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { Link } from "react-router";
import confetti from "canvas-confetti";

const ACCENT = "#C8392B";

export function ContactSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C8392B", "#ffffff", "#000000"]
    });
  };

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textSecondary = isDark ? "text-[#F2F2F0]/60" : "text-[#0D0D0D]/60";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const surface = isDark ? "bg-[#111111]" : "bg-white";

  const contactMethods = [
    {
      id: "linkedin",
      icon: Linkedin,
      label: t("contactSection.linkedin"),
      actionLabel: t("contactSection.connectLinkedIn"),
      url: "https://www.linkedin.com/in/pedro-oliveira-55a3b123a",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: t("contactSection.whatsapp"),
      actionLabel: t("contactSection.sendMessage"),
      url: "https://wa.me/5511997589393",
    },
    {
      id: "instagram",
      icon: Instagram,
      label: t("contactSection.instagram"),
      actionLabel: "Follow on Instagram",
      url: "https://www.instagram.com/shoosh.inc_studio",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-32 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left Column: Heading & Links */}
          <div className="lg:col-span-12 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}>
                ✦ Get in touch ✦
              </p>
              <h2 className={`font-display font-semibold italic text-[clamp(3.5rem,9vw,6.5rem)] tracking-tighter leading-[0.85] mb-12 ${textPrimary}`}>
                {t("contactSection.title1")}<br />
                <span className="opacity-30">{t("contactSection.title2")}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.id}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 group-hover:border-[#C8392B] group-hover:-translate-y-2 ${surface} ${border}`}>
                      <method.icon size={24} className="mb-8 text-[#C8392B]" />
                      <p className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}>
                        {method.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className={`font-sans text-xs font-bold uppercase tracking-widest ${textPrimary}`}>
                          {method.actionLabel}
                        </p>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C8392B]" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Utility shortcuts */}
              <div className="flex flex-wrap gap-4">
                {[
                  { to: "/cv", label: t("contactSection.cv"), icon: FileUser },
                  { to: "/faq", label: "FAQ", icon: HelpCircle },
                  { onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), label: "To Top", icon: ArrowUp }
                ].map((item, i) => (
                  item.to ? (
                    <Link
                      key={i}
                      to={item.to}
                      className={`px-8 py-4 rounded-2xl font-sans text-[0.65rem] font-bold tracking-widest uppercase border transition-all hover:bg-current/5 flex items-center gap-2 ${textPrimary} ${border}`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={i}
                      onClick={item.onClick}
                      className={`px-8 py-4 rounded-2xl font-sans text-[0.65rem] font-bold tracking-widest uppercase border transition-all hover:bg-current/5 flex items-center gap-2 ${textPrimary} ${border}`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: CTA Box */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative rounded-[3.5rem] p-12 md:p-16 border overflow-hidden ${isDark ? "bg-[#111111]/80 shadow-2xl border-white/5" : "bg-white shadow-xl border-black/5"}`}
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-[#C8392B] animate-pulse" />
                  <p className="font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#C8392B]">
                    Available for projects
                  </p>
                </div>

                <h3 className={`font-display font-semibold italic text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.9] tracking-tighter mb-8 ${textPrimary}`}>
                  {t("contactSection.ctaTitle")}
                </h3>
                
                <p className={`font-sans text-base md:text-lg font-light leading-relaxed mb-12 opacity-60 ${textPrimary}`}>
                  {t("contactSection.ctaDescription")}
                </p>

                <div className="flex flex-col gap-4">
                  <motion.a
                    href="https://cal.com/shoosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleConfetti}
                    className="group relative overflow-hidden bg-[#C8392B] text-white px-10 py-6 rounded-[2rem] font-sans font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:shadow-2xl active:scale-[0.98] text-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Send size={16} />
                      {t("contactSection.ctaButton")}
                    </span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:pedroolip13@gmail.com"
                    className={`px-10 py-6 rounded-[2rem] font-sans font-bold text-xs uppercase tracking-widest border transition-all hover:bg-current/5 flex items-center justify-center gap-3 ${textPrimary} ${border}`}
                  >
                    <Mail size={16} />
                    Email Direct
                  </motion.a>
                </div>

                <div className="mt-16 pt-10 border-t opacity-10 border-current" />
                
                <div className="flex items-center justify-between">
                  <span className={`font-display italic text-2xl font-bold tracking-tight opacity-20 ${textPrimary}`}>
                    Shoosh.inc
                  </span>
                  <span className={`font-sans text-[0.55rem] font-bold tracking-[0.3em] uppercase opacity-30 ${textPrimary}`}>
                    Tokyo · SP · 2024
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Footer info */}
        <div className={`mt-32 pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${border}`}>
          <p className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase ${textMuted}`}>
            {t("contactSection.footer")}
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Cookies"].map((legal) => (
              <span key={legal} className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase cursor-pointer hover:text-[#C8392B] transition-colors ${textMuted}`}>
                {legal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}