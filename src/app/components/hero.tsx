import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import Hls from "hls.js";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";

export function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center transition-colors duration-700 ${isDark ? "bg-black text-white" : "bg-[#FAF9F6] text-[#0D0D0D]"}`}
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 overflow-hidden w-full h-full z-0">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isDark ? "opacity-60" : "opacity-[0.8]"}`}
          style={{
            filter: isDark 
              ? "none" 
              : "invert(1) hue-rotate(340deg) saturate(3) brightness(1.02) contrast(1.1)"
          }}
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        />
        {/* Video Overlay with blur - completely transparent on light mode */}
        <div className={`absolute inset-0 backdrop-blur-[2px] transition-colors duration-700 ${isDark ? "bg-black/60" : "bg-transparent"}`} />
      </div>

      {/* Decorative Gradients */}
      {isDark ? (
        <>
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0" />
        </>
      ) : (
        <>
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#C8392B]/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-[#C8392B]/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none z-0" />
        </>
      )}

      {/* Grid Pattern overlay (ambient) */}
      <div className={`absolute inset-0 pointer-events-none z-[1] transition-all duration-700 ${
        isDark 
          ? "bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" 
          : "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
      } bg-[size:40px_40px]`} />

      {/* Main Content Container */}
      <motion.div
        style={{ y: scrollY }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center mt-20 flex flex-col items-center justify-center space-y-12"
      >
        {/* Pre-headline (Overline) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="flex items-center justify-center gap-4">
            <div className={`h-[1px] w-8 ${isDark ? "bg-white/20" : "bg-[#C8392B]/20"}`} />
            <span className={`font-sans text-[0.7rem] font-medium uppercase tracking-[0.4em] transition-colors ${isDark ? "text-white/70" : "text-[#C8392B]"}`}>
              ✦ Digital Portfolio ✦
            </span>
            <div className={`h-[1px] w-8 ${isDark ? "bg-white/20" : "bg-[#C8392B]/20"}`} />
          </div>
          <span className={`font-sans text-[0.6rem] font-bold tracking-[0.25em] uppercase transition-colors ${isDark ? "text-white/50" : "text-[#0D0D0D]/50"}`}>
            São Paulo, Brazil
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative inline-block select-none"
        >
          <h1 className={`font-display font-semibold italic text-[clamp(4.5rem,15vw,12rem)] tracking-tighter leading-[0.85] transition-all duration-700 ${
            isDark 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#b4c0ff]" 
              : "text-[#0D0D0D] drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)]"
          }`}>
            Shoosh.inc
          </h1>
          <div className={`absolute -bottom-3 left-0 right-0 h-[2px] origin-left transition-all duration-700 ${
            isDark 
              ? "bg-[#3054ff] shadow-[0_0_12px_rgba(48,84,255,0.8)]" 
              : "bg-[#C8392B] shadow-[0_4px_12px_rgba(200,57,43,0.3)]"
          }`} />
        </motion.div>

        {/* Subheadline & Focus Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.75 : 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto"
        >
          <p className={`font-sans text-base md:text-lg font-light leading-relaxed text-center transition-colors ${
            isDark ? "text-white/80" : "text-[#0D0D0D] font-medium drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]"
          }`}>
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase border transition-all ${
              isDark ? "bg-white/5 text-white/60 border-white/10" : "bg-white/80 text-[#0D0D0D] border-black/10 shadow-sm backdrop-blur-sm"
            }`}>UI/UX</span>
            <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase border transition-all ${
              isDark ? "bg-white/5 text-white/60 border-white/10" : "bg-white/80 text-[#0D0D0D] border-black/10 shadow-sm backdrop-blur-sm"
            }`}>Web Design</span>
            <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase border transition-all ${
              isDark ? "bg-white/5 text-white/60 border-white/10" : "bg-white/80 text-[#0D0D0D] border-black/10 shadow-sm backdrop-blur-sm"
            }`}>Product Design</span>
          </div>
        </motion.div>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 w-full"
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`group relative px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] cursor-pointer ${
              isDark 
                ? "bg-white text-[#0a0400] hover:bg-[#3054ff] hover:text-white hover:shadow-[0_0_30px_rgba(48,84,255,0.5)]" 
                : "bg-[#0D0D0D] text-white hover:bg-[#C8392B] hover:shadow-[0_0_30px_rgba(200,57,43,0.4)]"
            }`}
            whileHover={{ y: -4 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {t("hero.cta")}
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
            </span>
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-[0.2em] border transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
              isDark 
                ? "border-white/20 text-white bg-white/5 hover:bg-white/10" 
                : "border-black/20 text-[#0D0D0D] bg-black/5 hover:bg-black/10"
            }`}
            whileHover={{ y: -4 }}
          >
            <Mail size={14} className="opacity-80" />
            {t("hero.sendEmail")}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative vertical coordinates - Minimalist Sidebar Accent */}
      <div className={`absolute left-8 lg:left-14 bottom-14 hidden md:flex flex-col items-start gap-1 font-sans text-[0.55rem] tracking-[0.25em] uppercase z-10 transition-colors ${isDark ? "text-white/30" : "text-black/30"}`}>
        <span>23.5505°S · 46.6333°W</span>
        <span>São Paulo, BR</span>
      </div>

      <div className={`absolute right-8 lg:right-14 bottom-14 hidden md:flex flex-col items-end gap-1 font-sans text-[0.55rem] tracking-[0.25em] uppercase z-10 transition-colors ${isDark ? "text-white/30" : "text-black/30"}`}>
        <span>EST. 2019</span>
        <span>STUDIO ©2026</span>
      </div>

      {/* Interactive Micro Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className={`font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase transition-colors ${isDark ? "text-white/40" : "text-black/40"}`}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-[1.5px] h-8 bg-gradient-to-b transition-all ${
            isDark ? "from-white/60 to-transparent" : "from-[#C8392B]/60 to-transparent"
          }`}
        />
      </div>
    </section>
  );
}
