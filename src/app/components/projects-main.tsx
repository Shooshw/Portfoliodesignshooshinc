import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { mainProjects } from "../data/projects";
import type { Project } from "../data/projects";

interface ProjectsMainProps {
  onProjectClick: (project: Project) => void;
}

import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectsMain({ onProjectClick }: ProjectsMainProps) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";
  const cardBg = isDark ? "bg-[#111111]" : "bg-white";
  const border = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const tooltipBg = isDark ? "bg-[#F2F2F0]" : "bg-[#0D0D0D]";
  const tooltipText = isDark ? "text-[#0D0D0D]" : "text-[#F2F2F0]";

  return (
    <section id="projects" className={`py-32 relative transition-colors duration-700 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-2xl">
            <p className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase mb-6 ${textMuted}`}>
              ✦ Selective Work ✦
            </p>
            <h2 className={`font-display font-semibold italic text-[clamp(2.8rem,5vw,4.5rem)] tracking-tighter leading-[0.9] ${textPrimary}`}>
              {t("projects.main.title")}
            </h2>
          </div>
          <p className={`font-sans text-sm md:text-right max-w-sm leading-relaxed opacity-60 ${textPrimary}`}>
            {t("projects.main.subtitle")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {mainProjects.map((project, index) => {
            const isAquora = project.title === "Aquora" || project.id === 1;
            const isLol = project.title === "League of Legends" || project.id === 2;
            
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => onProjectClick(project)}
              className={`group relative flex flex-col rounded-[2.5rem] border overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 ${cardBg} ${border} shadow-sm hover:shadow-2xl`}
              onMouseEnter={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) {
                   vid.playbackRate = isAquora ? 1.5 : 1.0;
                   vid.play().catch(()=>{});
                }
              }}
              onMouseLeave={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) {
                   vid.pause();
                   vid.currentTime = 0;
                }
              }}
            >
              <div className="relative h-[420px] overflow-hidden bg-[#0D0D0D]">
                {isAquora ? (
                   <>
                     <img src="/src/assets/images/regenerated_image_1778465979958.png" alt="Aquora" className="absolute inset-0 w-full h-full object-contain p-8 bg-gradient-to-tr from-[#fdfbfb] via-[#e2ebf0] to-[#fdfbfb] transition-transform duration-700 z-10 group-hover:opacity-0" />
                     <video src="/src/assets/images/List-9-16.mp4" loop playsInline muted className="absolute inset-0 w-full h-full object-cover scale-[1.10] group-hover:scale-[1.13] transition-transform duration-700 z-0" />
                   </>
                ) : isLol ? (
                   <>
                     <img src="/src/assets/images/regenerated_image_1778283536856.png" alt="LoL" className="absolute inset-0 w-full h-full object-cover scale-[1.5] transition-transform duration-700 z-10 group-hover:opacity-0" />
                     <video src="/src/assets/images/1668457441-1668457441-neeko-the-curious-chameleon-live-wallpaper.mp4" loop playsInline muted className="absolute inset-0 w-full h-full object-cover scale-[1.5] transition-transform duration-700 z-0" />
                   </>
                ) : project.image ? (
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-40 transition-transform duration-700 group-hover:scale-[1.03]`} />
                )}
                
                {/* Overlay on hover (VER DETALHES bar) */}
                <div className="absolute -bottom-px left-0 right-0 h-16 bg-black/60 backdrop-blur-md flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <span className="text-white font-sans text-[0.7rem] font-bold tracking-widest uppercase flex items-center gap-2">
                    {t("projects.viewDetails") || "VER DETALHES"} <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Tags on top */}
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                   <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-[0.6rem] font-bold tracking-widest uppercase">
                    {project.translations?.[language]?.category || project.category}
                  </span>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-8 pb-10 flex flex-col relative bg-inherit z-30">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className={`font-display font-semibold italic text-2xl tracking-tighter transition-colors group-hover:text-[#C8392B] ${textPrimary}`}>
                    {project.translations?.[language]?.title || project.title}
                  </h3>
                  <span className={`font-sans text-[0.65rem] font-bold tracking-widest opacity-30 ${textPrimary}`}>
                    {project.year}
                  </span>
                </div>
                <p className={`font-sans text-sm leading-relaxed mb-8 opacity-60 line-clamp-2 ${textPrimary}`}>
                  {project.translations?.[language]?.description || project.description}
                </p>
                <div className="relative group/tooltip">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-lg font-sans text-[0.6rem] font-bold tracking-wider uppercase border ${border} ${textMuted}`}
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className={`px-3 py-1 rounded-lg font-sans text-[0.6rem] font-bold tracking-wider uppercase border border-transparent ${textMuted}`}>
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                  {/* Tooltip */}
                  {project.tools.length > 3 && (
                    <div className={`absolute -top-10 left-0 ${tooltipBg} ${tooltipText} text-[0.6rem] font-bold tracking-wide uppercase px-3 py-1.5 rounded opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl`}>
                      {project.tools.join(" • ")}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )})}
        </div>

      </div>
    </section>
  );
}
