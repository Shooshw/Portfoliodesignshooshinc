import { motion } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  Code,
  Lightbulb,
} from "lucide-react";
import { useTheme } from "../contexts/theme-context";

export function AboutMe() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const surface = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";

  const technicalSkills = [
    "Adobe Suite", "Office Suite", "3D Modeling", "Figma",
    "Inkscape", "Gimp", "Krita", "Affinity", "ClipChamp", "DaVinci Resolve",
  ];

  const softSkills = ["Prototyping", "Web Design", "Communication", "Graphic Design"];

  const languages = [
    { name: t("lang.english"), level: t("lang.native") },
    { name: t("lang.spanish"), level: t("lang.professional") },
    { name: t("lang.french"), level: t("lang.intermediate") },
  ];

  return (
    <section id="about-detailed" className={`py-32 relative overflow-hidden transition-colors duration-700 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}>
            ✦ Curriculum Vitae ✦
          </p>
          <h2 className={`font-display font-semibold italic text-[clamp(3.5rem,8vw,6rem)] tracking-tighter leading-[0.85] ${textPrimary}`}>
            {t("about.title1")}<br />
            <span className="opacity-30">{t("about.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Journey & Education */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">
            
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`p-10 rounded-[3rem] border ${surface} ${border}`}>
                <div className="flex items-center gap-4 mb-10">
                  <GraduationCap className="text-[#C8392B]" size={28} />
                  <h3 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("about.academic")}</h3>
                </div>
                <div className="space-y-12">
                   {[1, 2].map(num => (
                    <div key={num} className="relative pl-10 border-l border-[#C8392B]/20">
                      <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-[#C8392B]" />
                      <p className={`font-sans text-[0.65rem] font-bold tracking-widest uppercase mb-2 ${textMuted}`}>
                        {t(`academic.degree${num}.period`)}
                      </p>
                      <h4 className={`font-display font-semibold text-xl mb-1 ${textPrimary}`}>
                        {t(`academic.degree${num}.title`)}
                      </h4>
                      <p className={`font-sans text-sm opacity-60 ${textPrimary}`}>
                        {t(`academic.degree${num}.institution`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className={`p-10 rounded-[3rem] border ${surface} ${border}`}>
                <div className="flex items-center gap-4 mb-10">
                  <Briefcase className="text-[#C8392B]" size={28} />
                  <h3 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("about.experience")}</h3>
                </div>
                <div className="space-y-12">
                   {[1, 2].map(num => (
                    <div key={num} className="relative pl-10 border-l border-[#C8392B]/20">
                      <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-[#C8392B]" />
                      <p className={`font-sans text-[0.65rem] font-bold tracking-widest uppercase mb-2 ${textMuted}`}>
                        {t(`experience.job${num}.period`)}
                      </p>
                      <h4 className={`font-display font-semibold text-xl mb-1 ${textPrimary}`}>
                        {t(`experience.job${num}.title`)}
                      </h4>
                      <p className={`font-sans text-sm opacity-60 leading-relaxed ${textPrimary}`}>
                        {t(`experience.job${num}.description`)}
                        {t(`experience.job${num}.company`) && ` · ${t(`experience.job${num}.company`)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Complementary Info */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <Award className="text-[#C8392B]" size={24} />
                <h3 className={`font-display font-semibold text-2xl ${textPrimary}`}>{t("about.certifications")}</h3>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map(num => (
                  <li key={num} className={`font-sans text-sm leading-relaxed pb-4 border-b ${border} last:border-0 ${textPrimary} opacity-60`}>
                    {t(`cert.${num}`)}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <Languages className="text-[#C8392B]" size={24} />
                <h3 className={`font-display font-semibold text-2xl ${textPrimary}`}>{t("about.languages")}</h3>
              </div>
              <div className="space-y-4 text-sm">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-0 border-current/5">
                    <span className={`font-sans font-medium ${textPrimary}`}>{lang.name}</span>
                    <span className="font-sans text-[0.65rem] font-bold tracking-widest uppercase text-[#C8392B] bg-[#C8392B]/[0.03] px-3 py-1 rounded-full border border-[#C8392B]/20">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <Lightbulb className="text-[#C8392B]" size={24} />
                <h3 className={`font-display font-semibold text-2xl ${textPrimary}`}>{t("about.preferences")}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className={`p-4 rounded-2xl border ${border} ${isDark ? "bg-white/2" : "bg-black/2"}`}>
                    <p className={`font-sans text-xs italic ${textPrimary} opacity-60`}>{t(`pref.${num}`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Skills Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 text-center lg:text-left">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
                  <Code className="text-[#C8392B]" size={28} />
                  <h3 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("about.technicalSkills")}</h3>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {technicalSkills.map((skill, index) => (
                    <span key={index} className={`px-6 py-3 rounded-2xl border font-sans text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#C8392B] hover:text-white hover:border-[#C8392B] ${textPrimary} ${border}`}>
                      {skill}
                    </span>
                  ))}
              </div>
           </motion.div>

           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`p-10 rounded-[3rem] border ${surface} ${border}`}
            >
              <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
                  <Lightbulb className="text-[#C8392B]" size={28} />
                  <h3 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("about.softSkills")}</h3>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {softSkills.map((skill, index) => (
                    <span key={index} className={`px-6 py-3 rounded-2xl border font-sans text-xs font-bold tracking-widest uppercase border-[#C8392B]/20 text-[#C8392B] bg-[#C8392B]/[0.02]`}>
                      {skill}
                    </span>
                  ))}
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
