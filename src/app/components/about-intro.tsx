import { motion } from "motion/react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { Award, Target, Star } from "lucide-react";

const technicalSkills = [
  "Adobe Suite",
  "Office Suite",
  "3D Modeling",
  "Figma",
  "Inkscape",
  "Gimp",
  "Krita",
  "Affinity",
  "ClipChamp",
  "DaVinci Resolve",
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

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textSecondary = isDark ? "text-[#F2F2F0]/60" : "text-[#0D0D0D]/60";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const surface = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";

  const stats = [
    { icon: Award, label: t("about.yearsExperience"), value: "5+" },
    { icon: Target, label: t("about.projectsCompleted"), value: "50+" },
    { icon: Star, label: t("about.academicGrade"), value: "9.5" },
  ];

  return (
    <section
      id="about-intro"
      className={`py-32 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      {/* Decorative vertical line */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-current opacity-10 ${textPrimary}`}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Heading & Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-6 ${textMuted}`}
            >
              ✦ Profile Analysis ✦
            </p>
            <h2
              className={`font-display font-semibold italic text-[clamp(2.8rem,6vw,4.5rem)] tracking-tighter leading-[0.9] mb-8 ${textPrimary}`}
            >
              {t("about.title")}
            </h2>
            <div className="space-y-4">
              <p
                className={`font-sans text-xl font-light leading-relaxed ${textSecondary}`}
              >
                {t("about.subtitle")}
              </p>
              <div className={`h-px w-20 bg-[#C8392B]`} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-[2rem] border transition-transform hover:-translate-y-1 ${surface} ${border}`}
                >
                  <stat.icon size={20} className="text-[#C8392B] mb-6" />
                  <p
                    className={`font-display font-bold italic text-3xl mb-1 ${textPrimary}`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`font-sans text-[0.6rem] font-bold tracking-widest uppercase ${textMuted}`}
                  >
                    {stat.label}
                  </p>
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
            <div
              className={`p-10 rounded-[2.5rem] border relative overflow-hidden mb-12 ${surface} ${border}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target size={120} />
              </div>
              <p
                className={`font-sans text-base md:text-lg leading-relaxed font-light ${textSecondary}`}
              >
                {t("about.description")}
              </p>
            </div>

            {/* Skills Accordion Style */}
            <div className="space-y-10">
              {/* Technical */}
              <div>
                <h3
                  className={`font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3 ${textMuted}`}
                >
                  <span className="w-8 h-px bg-current opacity-20" />
                  {t("about.technicalSkills")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl font-sans text-xs font-medium border transition-colors hover:border-[#C8392B]/50 ${textSecondary} ${border} ${surface}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3
                  className={`font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3 ${textMuted}`}
                >
                  <span className="w-8 h-px bg-current opacity-20" />
                  {t("about.softSkills")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider border text-[#C8392B] bg-[#C8392B]/[0.03] border-[#C8392B]/20`}
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
