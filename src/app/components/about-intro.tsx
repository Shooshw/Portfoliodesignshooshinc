import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { Award, Target, Star } from "lucide-react";

const technicalSkills = [
  "Adobe Suite", "Office Suite", "3D Modeling", "Figma",
  "Inkscape", "Gimp", "Krita", "Affinity", "ClipChamp", "DaVinci Resolve",
];

const softSkills = [
  "softSkill.prototyping",
  "softSkill.webDesign",
  "softSkill.communication",
  "softSkill.graphicDesign",
];

export function AboutIntro() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-black" : "bg-[#FAF9F6]";
  const textPrimary = isDark ? "text-white" : "text-[#0D0D0D]";
  const textSecondary = isDark ? "text-white/60" : "text-[#0D0D0D]/70";
  const textMuted = isDark ? "text-white/40" : "text-[#0D0D0D]/40";
  const surface = isDark ? "bg-[#0A0A0A]" : "bg-white/90 backdrop-blur-md shadow-sm";
  const border = isDark ? "border-white/10" : "border-black/[0.06]";

  const stats = [
    { icon: Award, label: t("about.yearsExperience"), value: "5+" },
    { icon: Target, label: t("about.projectsCompleted"), value: "50+" },
    { icon: Star, label: t("about.academicGrade"), value: "9.5" },
  ];

  return (
    <section id="about-intro" className={`py-32 relative overflow-hidden transition-all duration-700 ${bg}`}>
      {/* Decorative vertical line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#C8392B] opacity-20`} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left Column: Heading & Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-6 ${textMuted} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8392B]" />
              ✦ {t("about.title").split(".")[0] || "Profile Analysis"} ✦
            </p>
            <h2 className={`font-display font-semibold italic text-[clamp(2.8rem,6vw,4.5rem)] tracking-tighter leading-[0.9] mb-8 ${textPrimary}`}>
              {t("about.title")}
            </h2>
            <div className="space-y-4">
              <p className={`font-sans text-xl font-light leading-relaxed ${textSecondary}`}>
                {t("about.subtitle")}
              </p>
              <div className={`h-1 w-20 bg-[#C8392B] transition-all duration-300 shadow-[0_2px_8px_rgba(200,57,43,0.3)]`} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className={`p-8 rounded-[2rem] border transition-all duration-300 ${surface} ${border} ${
                    isDark 
                      ? "hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                      : "hover:border-[#C8392B]/30 hover:shadow-[0_10px_30px_rgba(200,57,43,0.08)]"
                  } hover:-translate-y-1`}
                >
                  <stat.icon size={20} className="text-[#C8392B] mb-6" />
                  <p className={`font-display font-bold italic text-3xl mb-1 ${textPrimary}`}>{stat.value}</p>
                  <p className={`font-sans text-[0.6rem] font-bold tracking-widest uppercase ${textMuted}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Narrative & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-28"
          >
            <div className={`p-10 rounded-[2.5rem] border relative overflow-hidden mb-12 transition-all duration-500 ${surface} ${border} ${
              !isDark && "shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
            }`}>
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                <Target size={120} className="text-[#C8392B]" />
              </div>
              <p className={`font-sans text-base md:text-lg leading-relaxed font-light ${textSecondary}`}>
                {t("about.description")}
              </p>
            </div>

            {/* Skills Accordion Style */}
            <div className="space-y-10">
              {/* Technical */}
              <div>
                <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3 ${textMuted}`}>
                  <span className={`w-8 h-px transition-colors ${isDark ? "bg-white/20" : "bg-[#C8392B]/30"}`} />
                  {t("about.technicalSkills")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl font-sans text-xs font-medium border transition-all duration-300 ${textSecondary} ${border} ${surface} ${
                        isDark 
                          ? "hover:border-white/30 hover:bg-white/5" 
                          : "hover:border-[#C8392B]/40 hover:bg-[#C8392B]/5 hover:text-[#C8392B]"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3 ${textMuted}`}>
                  <span className={`w-8 h-px transition-colors ${isDark ? "bg-white/20" : "bg-[#C8392B]/30"}`} />
                  {t("about.softSkills")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                        isDark 
                          ? "text-[#b4c0ff] bg-blue-950/20 border-blue-900/30 hover:border-blue-700/50" 
                          : "text-[#C8392B] bg-[#C8392B]/5 border-[#C8392B]/20 hover:bg-[#C8392B]/10 hover:border-[#C8392B]/40"
                      }`}
                    >
                      {t(skill)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}