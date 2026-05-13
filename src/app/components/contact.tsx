import { motion } from "motion/react";
import {
  Mail,
  Linkedin,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  ArrowUp,
  FileUser,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Check,
} from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { useState } from "react";

const ACCENT = "#C8392B";

export function Contact() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "34ff4e9b-3598-464a-a019-ab1e584b96ef",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfólio - Formulário de Contato",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        throw new Error(data.message || "Erro ao enviar mensagem");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erro desconhecido",
      );
    }
  };

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const surface = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const inputBg = isDark ? "bg-[#F2F2F0]/5" : "bg-white";

  return (
    <div className={`min-h-screen py-32 transition-colors duration-700 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Success / Copy Notification */}
        <AnimatePresence>
          {emailCopied && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] bg-[#C8392B] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-sans font-bold text-sm uppercase tracking-widest"
            >
              <Check size={18} />
              {t("contact.copied")}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p
            className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}
          >
            ✦ Get In Touch ✦
          </p>
          <h1
            className={`font-display font-semibold italic text-[clamp(3.5rem,8vw,5.5rem)] tracking-tighter leading-[0.85] mb-8 ${textPrimary}`}
          >
            {t("contact.title1")}{" "}
            <span className="opacity-30">{t("contact.title2")}</span>
          </h1>
          <p
            className={`font-sans text-xl opacity-40 max-w-2xl mx-auto leading-relaxed ${textPrimary}`}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar: Contact Info */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <h3
                className={`font-display font-semibold italic text-2xl mb-10 ${textPrimary}`}
              >
                {t("contact.getInTouch")}
              </h3>
              <div className="space-y-6">
                {/* Email Action */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("pedroolip13@gmail.com");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className={`w-full flex items-center gap-6 p-6 rounded-3xl transition-all border border-transparent hover:border-[#C8392B]/20 group ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
                >
                  <div className="p-3 rounded-2xl bg-[#C8392B]/10 text-[#C8392B] group-hover:bg-[#C8392B] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
                    >
                      {t("contact.email")}
                    </p>
                    <p className={`font-sans text-sm font-bold ${textPrimary}`}>
                      pedroolip13@gmail.com
                    </p>
                  </div>
                </button>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/pedro-oliveira-55a3b123a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center gap-6 p-6 rounded-3xl transition-all border border-transparent hover:border-[#C8392B]/20 group ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
                >
                  <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Linkedin size={24} />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
                    >
                      {t("contact.linkedin")}
                    </p>
                    <p className={`font-sans text-sm font-bold ${textPrimary}`}>
                      /in/pedro-oliveira-55a3b123a
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5511997589393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center gap-6 p-6 rounded-3xl transition-all border border-transparent hover:border-[#C8392B]/20 group ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
                >
                  <div className="p-3 rounded-2xl bg-green-600/10 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
                    >
                      {t("contact.whatsapp")}
                    </p>
                    <p className={`font-sans text-sm font-bold ${textPrimary}`}>
                      +55 (11) 99758-9393
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Status Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <h3
                className={`font-display font-semibold italic text-2xl mb-8 ${textPrimary}`}
              >
                {t("contact.availability")}
              </h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="p-3 rounded-2xl bg-[#C8392B]/5 text-[#C8392B] border border-[#C8392B]/10">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p
                      className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
                    >
                      {t("contact.responseTime")}
                    </p>
                    <p
                      className={`font-sans text-xs font-bold leading-relaxed ${textPrimary}`}
                    >
                      {t("contact.within24h")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-3 rounded-2xl bg-[#C8392B]/5 text-[#C8392B] border border-[#C8392B]/10">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p
                      className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
                    >
                      {t("contact.location")}
                    </p>
                    <p
                      className={`font-sans text-xs font-bold leading-relaxed ${textPrimary}`}
                    >
                      {t("contact.remote")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-12">
            {/* Calendar CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-10 md:p-14 rounded-[3.5rem] border overflow-hidden relative group bg-gradient-to-br from-[#C8392B]/10 to-transparent border-[#C8392B]/20`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Calendar size={28} className="text-[#C8392B]" />
                  <h3
                    className={`font-display font-semibold italic text-3xl md:text-4xl ${textPrimary}`}
                  >
                    {t("contact.scheduleTitle")}
                  </h3>
                </div>
                <p
                  className={`font-sans text-lg opacity-60 mb-10 max-w-xl leading-relaxed ${textPrimary}`}
                >
                  {t("contact.scheduleDesc")}
                </p>
                <button
                  onClick={() =>
                    window.open("https://cal.com/shoosh", "_blank")
                  }
                  className="bg-[#C8392B] text-white px-10 py-5 rounded-[2rem] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#C8392B]/20 transition-all hover:shadow-2xl hover:scale-105 active:scale-[0.98] inline-flex items-center gap-4"
                >
                  <Calendar size={16} />
                  {t("contact.scheduleButton")}
                </button>
              </div>
              {/* Decorative glyph */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Calendar size={300} className="text-[#C8392B]" />
              </div>
            </motion.div>

            {/* Direct Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`p-10 md:p-14 rounded-[3.5rem] border ${surface} ${border}`}
            >
              <h3
                className={`font-display font-semibold italic text-3xl mb-12 ${textPrimary}`}
              >
                {t("contact.sendMessage")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase px-2 ${textMuted}`}
                    >
                      {t("contact.fullName")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-6 py-5 rounded-2xl border transition-all outline-none focus:border-[#C8392B] focus:ring-4 focus:ring-[#C8392B]/5 font-sans text-sm ${inputBg} ${border} ${textPrimary}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase px-2 ${textMuted}`}
                    >
                      {t("contact.emailAddress")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-5 rounded-2xl border transition-all outline-none focus:border-[#C8392B] focus:ring-4 focus:ring-[#C8392B]/5 font-sans text-sm ${inputBg} ${border} ${textPrimary}`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="subject"
                    className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase px-2 ${textMuted}`}
                  >
                    {t("contact.subject")}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder={t("contact.subjectPlaceholder")}
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 rounded-2xl border transition-all outline-none focus:border-[#C8392B] focus:ring-4 focus:ring-[#C8392B]/5 font-sans text-sm ${inputBg} ${border} ${textPrimary}`}
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase px-2 ${textMuted}`}
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-6 py-6 rounded-3xl border transition-all outline-none focus:border-[#C8392B] focus:ring-4 focus:ring-[#C8392B]/5 font-sans text-sm min-h-[160px] resize-none ${inputBg} ${border} ${textPrimary}`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-[#C8392B] text-white py-6 rounded-2xl font-sans font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#C8392B]/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {formStatus === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {formStatus === "loading"
                    ? t("contact.sending")
                    : t("contact.submitButton")}
                </motion.button>

                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 font-sans text-sm font-bold"
                    >
                      <CheckCircle size={20} />
                      {t("contact.successMessage")}
                    </motion.div>
                  )}

                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 font-sans text-sm font-bold"
                    >
                      <AlertCircle size={20} />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Global Navigation Footer */}
        <div className="mt-24 pt-24 border-t border-current/5 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`px-8 py-5 rounded-2xl border font-sans text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#C8392B] hover:border-[#C8392B] hover:text-white inline-flex items-center gap-4 ${border} ${textPrimary}`}
          >
            <ArrowUp size={14} />
            {t("contact.backToTop")}
          </button>
          <button
            onClick={() => navigate("/cv")}
            className="px-8 py-5 rounded-2xl bg-[#0D0D0D] text-white font-sans text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#C8392B] shadow-xl inline-flex items-center gap-4"
          >
            <FileUser size={14} />
            {t("contact.viewCV")}
          </button>
        </div>
      </div>
    </div>
  );
}
