import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, FileText, Archive, Figma, Phone } from "lucide-react";
import { useEffect, Suspense, lazy } from "react";
import type { Project, ProjectFile } from "../data/projects";
import { useTheme } from "../contexts/theme-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/language-context";

const AquoraProject = lazy(() => import("./aquora-project").then(module => ({ default: module.AquoraProject })));
const LolProject = lazy(() => import("./lol-project").then(module => ({ default: module.LolProject })));

const ACCENT = "#C8392B";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function FileIcon({ type }: { type: ProjectFile["type"] }) {
  switch (type) {
    case "pdf":   return <FileText className="w-4 h-4" />;
    case "figma": return <Figma className="w-4 h-4" />;
    case "zip":   return <Archive className="w-4 h-4" />;
    case "link":  return <ExternalLink className="w-4 h-4" />;
  }
}

function FileLabel({ type }: { type: ProjectFile["type"] }) {
  switch (type) {
    case "pdf":   return "PDF";
    case "figma": return "Figma";
    case "zip":   return "ZIP";
    case "link":  return "Link";
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#FFFFFF]";
  const textPrimary = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/45" : "text-[#0D0D0D]/50";
  const surface = isDark ? "bg-[#111111]" : "bg-[#F5F5F3]";
  const borderColor = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const iconBg = isDark ? "bg-[#F2F2F0]/7" : "bg-[#EFEFEF]";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-black/5";

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    window.addEventListener("close-modals", onClose);
    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("close-modals", onClose);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  if (project?.title === "League of Legends" || project?.id === 2 || project?.id === 5) {
    return (
      <AnimatePresence>
        {project && (
           <Suspense fallback={<div className="fixed inset-0 bg-[#010a13] z-[150] flex items-center justify-center text-[#c69b3f]">{language === 'pt' ? 'Carregando...' : 'Loading...'}</div>}>
             <LolProject project={project} onClose={onClose} />
           </Suspense>
        )}
      </AnimatePresence>
    );
  }

  if (project?.title === "Aquora" || project?.id === 1 || project?.id === 6) {
    return (
      <AnimatePresence>
        {project && (
           <Suspense fallback={<div className="fixed inset-0 bg-[#f0f4f8] z-[150] flex items-center justify-center text-teal-600">{language === 'pt' ? 'Carregando...' : 'Loading...'}</div>}>
             <AquoraProject project={project} onClose={onClose} />
           </Suspense>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-lenis-prevent
            className={`fixed right-0 top-0 h-full w-full max-w-[640px] z-[120] flex flex-col overflow-y-auto shadow-[-8px_0_40px_rgba(0,0,0,0.3)] transition-colors duration-500 ${bg}`}
          >
            {/* Sticky header */}
            <div className={`sticky top-0 z-20 flex items-center justify-between px-8 py-6 border-b transition-colors ${bg} ${borderColor}`}>
              <div>
                <span className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase ${textMuted}`}>
                  {project.translations?.[language]?.category || project.category} · {project.translations?.[language]?.year || project.year}
                </span>
                <h2 className={`font-display italic font-semibold text-2xl leading-none mt-1 ${textPrimary}`}>
                  {project.translations?.[language]?.title || project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2.5 rounded-full border transition-all ${surface} ${borderColor} ${textMuted} hover:scale-110 hover:text-current`}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Project image */}
            {project.image ? (
              <div className={`w-full relative overflow-hidden bg-black flex items-center justify-center ${project.id === 10 ? "h-[450px]" : "h-[300px]"}`}>
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${project.id === 10 ? "object-contain scale-[2.5]" : "object-cover object-center"}`}
                />
                {project.id === 10 && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
                )}
              </div>
            ) : (
              <div className={`w-full h-[300px] flex items-center justify-center bg-gradient-to-br ${project.color}`}>
                <p className="text-white/30 font-sans text-xs uppercase tracking-widest">Preview</p>
              </div>
            )}

            {/* Content */}
            <div className="p-8 flex flex-col gap-10">

              {/* Meta information */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t("project.role"), value: project.translations?.[language]?.role || project.role },
                  { label: t("project.year"), value: project.translations?.[language]?.year || project.year }
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${surface} ${borderColor}`}>
                    <p className={`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1.5 opacity-40 ${textPrimary}`}>
                      {item.label}
                    </p>
                    <p className={`font-sans text-sm font-medium ${textPrimary}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <section>
                <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 opacity-40 ${textPrimary}`}>
                  {t("project.about")}
                </h3>
                <p className={`font-sans text-[0.95rem] leading-relaxed font-light ${textMuted}`}>
                  {project.translations?.[language]?.longDescription || project.longDescription}
                </p>
              </section>

              {/* Tools Stack */}
              {project.tools.length > 0 && (
                <section>
                  <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 opacity-40 ${textPrimary}`}>
                    {t("project.stack")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg font-sans text-[0.7rem] font-bold tracking-wider uppercase border ${surface} ${borderColor} ${textMuted}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery Section */}
              <section>
                <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 opacity-40 ${textPrimary}`}>
                  {t("project.gallery")}
                </h3>
                <div className="space-y-6">
                  {project.gallery ? (
                    project.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-current/5 shadow-lg">
                        <ImageWithFallback
                          src={img}
                          alt={`${project.title} - ${idx + 1}`}
                          className="w-full h-auto block"
                        />
                      </div>
                    ))
                  ) : (
                    project.image && (
                      <div className="rounded-2xl overflow-hidden border border-current/5 shadow-lg">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto block"
                        />
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Rights & AI Usage Disclaimer */}
              <section className={`p-8 rounded-3xl border border-[#C8392B]/20 bg-[#C8392B]/[0.03]`}>
                <h3 className="font-sans text-[0.7rem] leading-none font-bold tracking-[0.15em] uppercase mb-4 text-[#C8392B]">
                  {t("project.rights")}
                </h3>
                <div className={`space-y-4 font-sans text-xs leading-relaxed ${textMuted}`}>
                  <p>{t("project.rights.desc")}</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>{t("project.rights.li1")}</li>
                    <li>{t("project.rights.li2")}</li>
                    <li>{t("project.rights.li3")}</li>
                  </ul>
                  <p className="pt-2 border-t border-[#C8392B]/10 italic">
                    {t("project.rights.footer")}
                  </p>
                </div>
              </section>

              {/* Files / Deliverables */}
              {project.files.length > 0 && (
                <section>
                  <h3 className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 opacity-40 ${textPrimary}`}>
                    {t("project.deliverables")}
                  </h3>
                  <div className="space-y-3">
                    {project.files.map((file, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:translate-x-1 ${surface} ${borderColor}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${iconBg} ${textMuted}`}>
                            <FileIcon type={file.type} />
                          </div>
                          <div>
                            <p className={`font-sans text-sm font-semibold ${textPrimary}`}>{file.name}</p>
                            <p className="font-sans text-[0.65rem] uppercase tracking-widest opacity-40">View only</p>
                          </div>
                        </div>
                        <FileLabel type={file.type} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Call to Action */}
              <div className={`p-10 rounded-[2.5rem] border text-center relative overflow-hidden group ${surface} ${borderColor}`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                <p className={`font-sans text-xs uppercase tracking-[0.2em] mb-3 opacity-40 ${textPrimary}`}>
                  {language === 'pt' ? 'Gostou deste projeto?' : 'Liked this project?'}
                </p>
                <p className={`font-display italic font-semibold text-2xl mb-8 tracking-tighter ${textPrimary}`}>
                  {language === 'pt' ? 'Vamos conversar sobre o seu.' : 'Let\'s talk about yours.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                  <a
                    href="https://cal.com/shoosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8392B] text-white px-8 py-4 rounded-2xl font-bold font-sans text-xs uppercase tracking-widest transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  >
                    {language === 'pt' ? 'Agendar Reunião' : 'Schedule Meeting'}
                  </a>
                  <a
                    href="https://wa.me/5511997589393"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold font-sans text-xs uppercase tracking-widest border transition-all ${borderColor} ${textPrimary} ${hoverBg}`}
                  >
                    <Phone size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="h-10" /> {/* Bottom spacing */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}