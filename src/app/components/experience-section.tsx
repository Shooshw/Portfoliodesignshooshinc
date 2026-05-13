import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function ExperienceSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const cardBg = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";

  const experiences = [
    {
      period: t("experience.job1.period"),
      title: t("experience.job1.title"),
      description: t("experience.job1.description"),
      company: "",
    },
    {
      period: t("experience.job2.period"),
      title: t("experience.job2.title"),
      description: "",
      company: t("experience.job2.company"),
    },
  ];

  return (
    <section
      className={`py-32 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p
            className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}
          >
            ✦ Professional Path ✦
          </p>
          <h2
            className={`font-display font-semibold italic text-5xl md:text-6xl tracking-tighter ${textPrimary}`}
          >
            {t("experience.title") || "Professional Experience"}
          </h2>
          <div className="mt-8 h-1 w-24 bg-[#C8392B]" />
        </motion.div>

        <div className="grid gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`p-10 md:p-12 rounded-[3.5rem] border flex flex-col lg:flex-row gap-10 lg:items-center group transition-all hover:shadow-2xl ${cardBg} ${border} ${
                isDark ? "hover:shadow-white/5" : "hover:shadow-black/5"
              }`}
            >
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#C8392B] bg-[#C8392B]/5 border border-[#C8392B]/20">
                <Briefcase
                  size={32}
                  className="text-[#C8392B] group-hover:text-white transition-colors"
                />
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h3
                    className={`font-display font-semibold italic text-3xl leading-tight ${textPrimary}`}
                  >
                    {exp.title}
                  </h3>
                  {exp.company && (
                    <span className="px-4 py-1.5 rounded-full text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#C8392B] text-white shadow-lg shadow-[#C8392B]/20">
                      {exp.company}
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-2 mb-8 font-sans text-xs font-bold tracking-widest uppercase ${textMuted}`}
                >
                  <Calendar size={14} className="opacity-40" />
                  <span>{exp.period}</span>
                </div>

                {exp.description && (
                  <p
                    className={`max-w-3xl font-sans text-base leading-relaxed opacity-60 ${textPrimary}`}
                  >
                    {exp.description}
                  </p>
                )}
              </div>

              {/* Extra visual detail */}
              <div className="hidden lg:block opacity-0 group-hover:opacity-20 transition-opacity">
                <p
                  className={`font-display italic text-6xl select-none ${textPrimary}`}
                >
                  0{index + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
