import { motion } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  Download,
  Palette,
  Lightbulb,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { useState } from "react";
import { ASSETS } from "../data/assets";

const cvPDF = ASSETS.cvPdf;

interface SkillWithTooltip {
  key: string;
  name: string;
  description: string;
}

export function CVPage() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleDownloadCV = async () => {
    try {
      const response = await fetch(cvPDF);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Pedro_Oliveira_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading CV:", error);
      window.open(cvPDF, "_blank");
    }
  };

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textSecondary = isDark ? "text-[#F2F2F0]/60" : "text-[#0D0D0D]/60";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const surface = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";

  const education = [
    {
      period: t("academic.degree1.period"),
      title: t("academic.degree1.title"),
      institution: t("academic.degree1.institution"),
    },
    {
      period: t("academic.degree2.period"),
      title: t("academic.degree2.title"),
      institution: t("academic.degree2.institution"),
    },
    {
      period: t("academic.degree3.period"),
      title: t("academic.degree3.title"),
      institution: t("academic.degree3.institution"),
    },
  ];

  const experiences = [
    {
      period: t("experience.job1.period"),
      title: t("experience.job1.title"),
      company: t("experience.job1.company"),
      description: t("experience.job1.description"),
    },
    {
      period: t("experience.job2.period"),
      title: t("experience.job2.title"),
      company: t("experience.job2.company"),
      description: t("experience.job2.description"),
    },
    {
      period: t("experience.job3.period"),
      title: t("experience.job3.title"),
      company: t("experience.job3.company"),
      description: t("experience.job3.description"),
    },
  ];

  const certifications = [t("cert.1"), t("cert.2"), t("cert.3")];

  const languages = [
    { name: t("lang.portuguese"), level: t("lang.native") },
    { name: t("lang.english"), level: t("lang.fluent") },
  ];

  const skills: SkillWithTooltip[] = [
    { key: "uiux", name: t("skill.uiux"), description: t("skill.uiux.desc") },
    { key: "branding", name: t("skill.branding"), description: t("skill.branding.desc") },
    { key: "illustration", name: t("skill.illustration"), description: t("skill.illustration.desc") },
    { key: "prototyping", name: t("skill.prototyping"), description: t("skill.prototyping.desc") },
    { key: "imageEditing", name: t("skill.imageEditing"), description: t("skill.imageEditing.desc") },
    { key: "motion", name: t("skill.motion"), description: t("skill.motion.desc") },
  ];

  const toolsConfigs = [
    { category: t("tools.design"), items: ["Figma", "Illustrator", "Photoshop", "InDesign", "Affinity"] },
    { category: t("tools.motion"), items: ["After Effects", "Premiere"] },
    { category: t("tools.illustration"), items: ["Inkscape", "Gimp"] },
    { category: t("tools.3d"), items: ["Blender", "Toon Boom"] },
    { category: t("tools.other"), items: ["Canva", "VSCode", "Google Workspace"] },
  ];

  return (
    <div className={`min-h-screen py-32 transition-colors duration-700 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-8 ${textMuted}`}>
              ✦ Curriculum Vitae ✦
            </p>
            <h1 className={`font-display font-semibold italic text-[clamp(3.5rem,9vw,6rem)] tracking-tighter leading-[0.85] mb-8 ${textPrimary}`}>
              {t("cv.title").split(' ')[0]}<br />
              <span className="opacity-30">{t("cv.title").split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className={`font-sans text-xl md:text-2xl font-light tracking-tight ${textSecondary}`}>
              {t("cv.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={handleDownloadCV}
              className="group relative overflow-hidden bg-[#C8392B] text-white px-10 py-6 rounded-[2rem] font-sans font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:shadow-2xl active:scale-[0.98] flex items-center gap-4"
            >
              <Download size={16} />
              {t("cv.download")}
            </button>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Content (left) */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-24">
            
            {/* Summary */}
            <section>
              <div className="flex items-center gap-6 mb-12">
                <Sparkles size={24} className="text-[#C8392B]" />
                <h2 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("cv.summary")}</h2>
              </div>
              <p className={`font-sans text-lg md:text-xl leading-relaxed font-light ${textSecondary}`}>
                {t("cv.summaryText")}
              </p>
              <div className={`mt-12 h-px w-24 bg-[#C8392B]`} />
            </section>

            {/* Experience */}
            <section>
              <div className="flex items-center gap-6 mb-16">
                <Briefcase size={24} className="text-[#C8392B]" />
                <h2 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("cv.professional")}</h2>
              </div>
              <div className="space-y-16">
                {experiences.map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-12 border-l border-[#C8392B]/20"
                  >
                    <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-[#C8392B]" />
                    <span className={`font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-4 block text-[#C8392B]`}>
                      {exp.period}
                    </span>
                    <h3 className={`font-display font-semibold italic text-2xl mb-2 ${textPrimary}`}>
                      {exp.title}
                    </h3>
                    <p className={`font-sans text-sm font-bold opacity-40 mb-6 uppercase tracking-wider ${textPrimary}`}>
                      {exp.company}
                    </p>
                    <p className={`font-sans text-base leading-relaxed font-light ${textSecondary}`}>
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-6 mb-16">
                <GraduationCap size={24} className="text-[#C8392B]" />
                <h2 className={`font-display font-semibold italic text-3xl ${textPrimary}`}>{t("cv.academic")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, idx) => (
                  <div 
                    key={idx}
                    className={`p-10 rounded-[2.5rem] border transition-colors hover:border-[#C8392B]/30 ${surface} ${border}`}
                  >
                    <span className={`font-sans text-[0.6rem] font-bold tracking-[0.25em] uppercase mb-4 block ${textMuted}`}>
                      {edu.period}
                    </span>
                    <h3 className={`font-display font-semibold text-xl mb-3 ${textPrimary}`}>
                      {edu.title}
                    </h3>
                    <p className={`font-sans text-sm opacity-60 ${textPrimary}`}>
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (right) */}
          <aside className="lg:col-span-12 xl:col-span-4 space-y-12">
            
            {/* Essential Skills */}
            <div className={`p-10 rounded-[3rem] border transition-colors ${surface} ${border}`}>
              <div className="flex items-center gap-4 mb-10">
                <Palette size={20} className="text-[#C8392B]" />
                <h3 className={`font-display font-semibold italic text-2xl ${textPrimary}`}>{t("cv.skills")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.key} className="relative group">
                    <button
                      className={`px-5 py-2.5 rounded-2xl font-sans text-[0.65rem] font-bold tracking-widest uppercase border transition-all ${textPrimary} ${border} hover:bg-[#C8392B] hover:border-[#C8392B] hover:text-white group-hover:shadow-lg`}
                    >
                      {skill.name}
                    </button>
                    {/* Simplified tooltip for clean UI */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-4 rounded-3xl shadow-2xl border text-[0.7rem] leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-90 group-hover:scale-100 z-50 backdrop-blur-xl ${isDark ? "bg-[#111111]/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black"}`}>
                      <p className="font-bold mb-1 uppercase tracking-widest text-[#C8392B]">{skill.name}</p>
                      {skill.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Stack */}
            <div className={`p-10 rounded-[3rem] border transition-colors ${surface} ${border}`}>
               <div className="flex items-center gap-4 mb-10">
                <Wrench size={20} className="text-[#C8392B]" />
                <h3 className={`font-display font-semibold italic text-2xl ${textPrimary}`}>{t("cv.tools")}</h3>
              </div>
              <div className="space-y-10">
                {toolsConfigs.map((cat, idx) => (
                  <div key={idx}>
                    <p className={`font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase mb-4 ${textMuted}`}>
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-2 text-primary">
                      {cat.items.map((item, i) => (
                        <span key={i} className={`px-4 py-2 border rounded-xl font-sans text-xs font-medium ${border} ${textSecondary}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Certs */}
            <div className={`p-10 rounded-[3rem] border transition-colors ${surface} ${border}`}>
              <div className="flex items-center gap-4 mb-8">
                <Languages size={20} className="text-[#C8392B]" />
                <h3 className={`font-display font-semibold italic text-2xl ${textPrimary}`}>{t("cv.languages")}</h3>
              </div>
              <div className="space-y-6 mb-12">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b last:border-0 border-current/5 pb-4">
                    <span className={`font-sans text-sm font-bold uppercase tracking-widest ${textPrimary}`}>{lang.name}</span>
                    <span className={`font-sans text-[0.65rem] font-bold text-[#C8392B] opacity-70`}>{lang.level}</span>
                  </div>
                ))}
              </div>

               <div className="flex items-center gap-4 mb-8">
                <Award size={20} className="text-[#C8392B]" />
                <h3 className={`font-display font-semibold italic text-2xl ${textPrimary}`}>{t("cv.certifications")}</h3>
              </div>
              <ul className="space-y-4">
                 {certifications.map((cert, idx) => (
                  <li key={idx} className={`font-sans text-xs leading-relaxed opacity-60 flex gap-3 ${textPrimary}`}>
                    <span className="text-[#C8392B]">•</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}