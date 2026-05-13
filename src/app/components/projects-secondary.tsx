import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { secondaryProjects } from "../data/projects";
import type { Project } from "../data/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ASSETS } from "../data/assets";

interface ParallaxProjectCardProps {
  project: Project;
  onClick: () => void;
  aspectRatio?: string;
  maxWidth?: string;
  imageInset?: number;
  objectFit?: "cover" | "contain";
  isPoster?: boolean;
  t: (key: string) => string;
}

function ParallaxProjectCard({
  project,
  onClick,
  aspectRatio = "1/1",
  maxWidth = "100%",
  imageInset = -30,
  objectFit = "cover",
  isPoster = false,
  t,
}: ParallaxProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  // Use the project color class to extract a hex or just rely on a CSS variable
  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000, maxWidth, aspectRatio }}
      onClick={onClick}
      className={`relative w-full overflow-hidden ${isPoster ? "rounded-sm shadow-[0_-20px_50px_-15px_rgba(255,255,255,0.15),0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-white/5" : "rounded-[2rem] border border-white/10 shadow-2xl"} cursor-pointer group backdrop-blur-md`}
    >
      <motion.div
        style={{ rotateX, y, scale }}
        className="w-full h-full transform-gpu"
      >
        <div
          className="absolute inset-0 bg-black"
          style={{
            top: imageInset,
            bottom: imageInset,
            left: imageInset,
            right: imageInset,
          }}
        >
          {isPoster && project.gallery && project.gallery.length > 1 ? (
            <div className="flex flex-col w-full h-full bg-[#111]">
              <div className="w-full aspect-square relative shrink-0">
                <ImageWithFallback
                  src={project.image || ""}
                  alt={project.title}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  className="group-hover:saturate-150 transition-all duration-700"
                />
              </div>
              <div className="flex-1 w-full flex bg-black border-t border-white/10">
                {project.gallery.slice(1, 4).map((img, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full relative border-r border-white/10 last:border-r-0"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} gallery ${i}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      className="group-hover:saturate-150 transition-all duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ImageWithFallback
              src={project.image || ""}
              alt={project.title}
              style={{ objectFit, width: "100%", height: "100%" }}
              className="group-hover:saturate-150 transition-all duration-700"
            />
          )}
        </div>

        {/* Spotlight Effect for Posters */}
        {isPoster && (
          <>
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-[radial-gradient(circle_at_50%_0%,rgba(255,245,210,0.4)_0%,transparent_65%)] opacity-80" />
            <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-gradient-to-b from-[#fff5d2]/15 via-transparent to-black/50" />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
        {/* Hover interaction hint */}
        <ArrowUpRight size={24} className="text-[#00f2ff] scale-75 group-hover:scale-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
}

interface ProjectsSecondaryProps {
  onProjectClick: (project: Project) => void;
}

export function ProjectsSecondary({ onProjectClick }: ProjectsSecondaryProps) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-[#050507]" : "bg-[#f5f5f7]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40";

  const musicJamProjects = secondaryProjects.filter((p) =>
    [
      "Mirror - ADO",
      "24k magic - Bruno Mars Fan cover",
      "Virtual Insanity - Jamiroquai",
    ].includes(p.title),
  );
  const indieSynthProject = secondaryProjects.find(
    (p) => p.title === "Revista Indiesynth",
  );

  const content = {
    pt: {
      musicJamTitle: "MUSIC JAM",
      musicJamDesc: "Inspirado pelo meu vasto repertório musical, iniciei um projeto de criação de capas de músicas e álbuns que envolvessem os que amam aquele artista, não só pelos ouvidos mas junto aos olhos.",
      indieSynthTitle: "REVISTA INDIESYNTH",
      indieSynthDesc1: "Produção de uma marca sobre jogos. Uma edição especial nostálgica aos antigos consoles portáteis. Feito um conteúdo exclusivo com poster especial na temática CyberCity.",
      indieSynthDesc2: "Este projeto de branding foca em uma estética analógica misturada ao ciberespaço, explorando formas densas, layouts editoriais ousados e tipografias vibrantes. Uma celebração ao legado indie em mídia impressa.",
    },
    en: {
      musicJamTitle: "MUSIC JAM",
      musicJamDesc: "Inspired by my vast musical repertoire, I started a project creating music and album covers that would engage those who love that artist, not only through their ears but also their eyes.",
      indieSynthTitle: "INDIESYNTH MAGAZINE",
      indieSynthDesc1: "Production of a gaming brand. A nostalgic special edition dedicated to old portable consoles. An exclusive content piece was created featuring a special CyberCity-themed poster.",
      indieSynthDesc2: "This branding project focuses on an analog aesthetic mixed with cyberspace, exploring dense shapes, bold editorial layouts, and vibrant typography. A celebration of the indie legacy in print media.",
    }
  };
  
  const text = content[language];

  return (
    <section
      id="projects-secondary"
      className={`pt-48 pb-32 relative overflow-hidden transition-colors duration-700 ${bg}`}
    >
      {/* Prismatic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          {/* Section 1: MUSIC JAM */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <div className="inline-block font-['Space_Mono'] uppercase tracking-[0.2em] text-[0.7rem] text-white/50 bg-black/40 px-4 py-2 border-l border-[#00f2ff] backdrop-blur-md mb-6">
                  System: Prismatic.Core
                </div>
                <h2
                  className={`font-display font-semibold italic text-[clamp(2.5rem,5vw,4rem)] tracking-tighter ${textPrimary}`}
                >
                  {text.musicJamTitle}
                </h2>
              </div>
              <p
                className={`font-sans text-sm md:text-right max-w-sm leading-relaxed opacity-60 ${textPrimary}`}
              >
                {text.musicJamDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {musicJamProjects.map((project) => {
                const translatedTitle = project.translations?.[language]?.title || project.title;
                const translatedCategory = project.translations?.[language]?.category || project.category;
                return (
                <div key={project.id} className="flex flex-col items-center justify-center w-full">
                  <ParallaxProjectCard
                    project={project}
                    onClick={() => onProjectClick(project)}
                    t={t}
                    aspectRatio={"3/4"}
                    objectFit={"contain"}
                    imageInset={0}
                    isPoster={true}
                    maxWidth={"85%"}
                  />
                  <div className="mt-6 text-center max-w-[85%]">
                    <h3 className={`font-bold text-sm tracking-wide ${textPrimary}`}>
                      {translatedTitle}
                    </h3>
                    <p className={`text-[0.65rem] uppercase tracking-widest opacity-50 mt-1 ${textPrimary}`}>
                      {translatedCategory}
                    </p>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Section 2: Revista IndieSynth */}
          {indieSynthProject && (
            <div className="mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <div className="inline-block font-['Space_Mono'] uppercase tracking-[0.2em] text-[0.7rem] text-white/50 bg-black/40 px-4 py-2 border-l border-[#ff0073] backdrop-blur-md mb-6">
                    System: Retro.Branding
                  </div>
                  <h2
                    className={`font-display font-semibold italic text-[clamp(2.5rem,5vw,4rem)] tracking-tighter ${textPrimary}`}
                  >
                    {text.indieSynthTitle}
                  </h2>
                </div>
                <p
                  className={`font-sans text-sm md:text-right max-w-sm leading-relaxed opacity-60 ${textPrimary}`}
                >
                  {text.indieSynthDesc1}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-stretch">
                <div className="flex flex-col gap-4 justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className={`font-bold text-2xl ${textPrimary}`}>
                      {indieSynthProject.translations?.[language]?.title || indieSynthProject.title}
                    </h3>
                    <p
                      className={`opacity-60 text-sm leading-relaxed ${textPrimary}`}
                    >
                      {text.indieSynthDesc2}
                    </p>
                  </div>
                  {indieSynthProject.gallery && indieSynthProject.gallery.length > 1 && (
                    <div className="w-full mt-auto flex-1 rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl relative min-h-[200px] hidden md:block">
                      <ImageWithFallback
                        src={ASSETS.indieSynthDetail}
                        alt="IndieSynth Detail"
                        className="w-full h-full object-cover absolute inset-0 scale-[1.35] object-center"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-start w-full h-full">
                  <ParallaxProjectCard
                    project={indieSynthProject}
                    onClick={() => onProjectClick(indieSynthProject)}
                    aspectRatio="16/9"
                    maxWidth="100%"
                    imageInset={0}
                    objectFit="cover"
                    t={t}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
