import { motion } from "motion/react";
import { GraduationCap, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../contexts/language-context";

import { useTheme } from "../contexts/theme-context";

export function EducationSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const bg       = isDark ? "bg-[#111111]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const cardBg   = isDark ? "bg-[#0D0D0D]" : "bg-white";
  const border   = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";

  const education = [
    { period: t("academic.degree1.period"), title: t("academic.degree1.title"), institution: t("academic.degree1.institution") },
    { period: t("academic.degree2.period"), title: t("academic.degree2.title"), institution: t("academic.degree2.institution") },
  ];

  const certifications = [t("cert.1"), t("cert.2"), t("cert.3"), t("cert.4")];

  return (
    <section id="education" className={`py-32 ${bg}`}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}>
            ✦ Learning Journey ✦
          </p>
          <h2 className={`font-display font-semibold italic text-5xl md:text-6xl tracking-tighter ${textPrimary}`}>
            {t("education.title")}
          </h2>
          <p className={`mt-6 font-sans text-lg opacity-40 max-w-xl mx-auto leading-relaxed ${textPrimary}`}>
            {t("education.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education List */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-10 rounded-[3rem] border transition-all hover:border-[#C8392B]/30 group ${cardBg} ${border}`}
              >
                <div className="flex items-start gap-6">
                   <div className="p-4 rounded-2xl bg-[#C8392B] text-white">
                      <GraduationCap size={24} />
                   </div>
                   <div>
                     <p className={`font-sans text-[0.65rem] font-bold tracking-widest uppercase mb-2 ${textMuted}`}>
                       {edu.period}
                     </p>
                     <h3 className={`font-display font-semibold text-2xl mb-1 group-hover:text-[#C8392B] transition-colors ${textPrimary}`}>
                       {edu.title}
                     </h3>
                     <p className={`font-sans text-sm opacity-60 ${textPrimary}`}>
                       {edu.institution}
                     </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`p-10 rounded-[3rem] border ${cardBg} ${border}`}
          >
             <div className="flex items-center gap-4 mb-10">
                <Award size={28} className="text-[#C8392B]" />
                <h3 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("education.certifications")}</h3>
             </div>
             <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8392B] mt-2 shrink-0" />
                    <p className={`font-sans text-sm leading-relaxed opacity-60 ${textPrimary}`}>
                      {cert}
                    </p>
                  </div>
                ))}
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
