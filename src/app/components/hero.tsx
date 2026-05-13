import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { useRef } from "react";

const ACCENT = "#C8392B"; // vermillion — sharp, not eggy

function BitmapDots({ isDark }: { isDark: boolean }) {
  const dotColor = isDark ? "rgba(242,242,240,0.1)" : "rgba(13,13,13,0.1)";
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px content-box",
      }}
    />
  );
}

function JapaneseGlyphs({
  isDark,
  scrollYProgress,
}: {
  isDark: boolean;
  scrollYProgress: any;
}) {
  const textColor = isDark ? "text-[#F2F2F0]/5" : "text-[#0D0D0D]/5";

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const items = [
    {
      char: "創",
      pos: "top-[6%] left-[4%]",
      size: "text-[clamp(6rem,13vw,11rem)]",
      y: y1,
      rotate: rotate1,
    },
    {
      char: "造",
      pos: "top-[10%] right-[4%]",
      size: "text-[clamp(4rem,9vw,8rem)]",
      y: y2,
      rotate: rotate2,
    },
    {
      char: "渋",
      pos: "bottom-[12%] left-[2%]",
      size: "text-[clamp(5rem,11vw,10rem)]",
      y: y2,
      rotate: rotate2,
    },
    {
      char: "谷",
      pos: "bottom-[8%] right-[3%]",
      size: "text-[clamp(3rem,7vw,6rem)]",
      y: y1,
      rotate: rotate1,
    },
  ];
  return (
    <>
      {items.map((g, i) => (
        <motion.div
          key={i}
          style={{ y: g.y, rotate: g.rotate }}
          className={`absolute select-none pointer-events-none font-display leading-none z-[1] ${g.pos} ${g.size} ${textColor}`}
        >
          {g.char}
        </motion.div>
      ))}
    </>
  );
}

function CoordStrip({
  isDark,
  pos,
}: {
  isDark: boolean;
  pos: "top" | "bottom";
}) {
  const items =
    pos === "top"
      ? ["PORTFOLIO ©2026", "SHOOSH.INC", "DESIGN STUDIO"]
      : ["23.5505°S · 46.6333°W", "SÃO PAULO · BR", "EST. 2019"];
  return (
    <div
      className={`absolute left-0 right-0 px-8 md:px-14 flex justify-between pointer-events-none font-sans text-[0.55rem] tracking-[0.25em] uppercase z-[10] transition-colors ${
        isDark ? "text-[#F2F2F0]/40" : "text-[#0D0D0D]/40"
      } ${pos === "top" ? "top-8" : "bottom-8"}`}
    >
      {items.map((item, i) => (
        <span key={i} className={i === 1 ? "hidden md:inline" : ""}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const textMain = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-[#F2F2F0]/50" : "text-[#0D0D0D]/50";
  const borderFaint = isDark ? "border-[#F2F2F0]/10" : "border-[#0D0D0D]/10";
  const panelBg = isDark ? "bg-[#F2F2F0]/3" : "bg-[#0D0D0D]/3";

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${bg}`}
    >
      <BitmapDots isDark={isDark} />

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <JapaneseGlyphs isDark={isDark} scrollYProgress={scrollYProgress} />
      <CoordStrip isDark={isDark} pos="top" />
      <CoordStrip isDark={isDark} pos="bottom" />

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-[20%] left-[6%] hidden xl:block z-[5]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className={`p-6 rounded-2xl border backdrop-blur-sm shadow-sm ${panelBg} ${borderFaint}`}
        >
          <div className="space-y-3">
            {["BRANDING", "VISUAL ID", "CODE", "MOTION"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-1 h-1 rounded-full ${i === 2 ? "bg-[#C8392B]" : "bg-current opacity-30"}`}
                />
                <span
                  className={`text-[0.6rem] font-bold tracking-[0.2em] font-sans ${textMuted}`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[25%] right-[6%] hidden xl:block z-[5]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className={`p-6 rounded-2xl border backdrop-blur-sm shadow-sm text-center ${panelBg} ${borderFaint}`}
        >
          <p
            className={`text-[0.5rem] tracking-[0.3em] uppercase mb-1 ${textMuted}`}
          >
            Stamp
          </p>
          <p
            className={`font-display text-4xl italic font-semibold leading-none ${textMain}`}
          >
            13
          </p>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative px-6 text-center z-[10] max-w-4xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Overline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className={`h-px w-12 ${isDark ? "bg-[#F2F2F0]/20" : "bg-[#0D0D0D]/20"}`}
            />
            <p
              className={`font-sans text-[0.65rem] font-bold tracking-[0.4em] uppercase ${textMuted}`}
            >
              ✦ Digital Portfolio ✦
            </p>
            <div
              className={`h-px w-12 ${isDark ? "bg-[#F2F2F0]/20" : "bg-[#0D0D0D]/20"}`}
            />
          </div>

          <h1 className="relative inline-block mb-12">
            <span
              className={`block font-display font-semibold italic text-[clamp(4.5rem,18vw,14rem)] tracking-tighter leading-[0.85] ${textMain}`}
            >
              Shoosh.inc
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
              className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C8392B] origin-left"
            />
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 mb-14">
            <p
              className={`font-sans text-sm md:text-base font-light max-w-md md:text-left leading-relaxed ${textMuted}`}
            >
              {t("hero.subtitle")}
            </p>
            <div className="h-12 w-px bg-current opacity-10 hidden md:block" />
            <div className="text-center md:text-left">
              <p
                className={`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1 ${textMuted}`}
              >
                Based in
              </p>
              <p
                className={`font-sans text-xs font-semibold uppercase ${textMain}`}
              >
                São Paulo, Brazil
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`group relative overflow-hidden px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] ${
                isDark
                  ? "bg-[#F2F2F0] text-[#0D0D0D]"
                  : "bg-[#0D0D0D] text-white"
              }`}
              whileHover={{ y: -4 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {t("hero.cta")}
                <ArrowDown
                  size={14}
                  className="transition-transform group-hover:translate-y-1"
                />
              </span>
            </motion.button>

            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-[0.2em] border transition-all hover:bg-current/5 ${textMain} ${borderFaint}`}
              whileHover={{ y: -4 }}
            >
              {t("hero.sendEmail")}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[10]">
        <p
          className={`font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase rotate-90 origin-left ml-3 ${textMuted}`}
        >
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-[1px] h-12 bg-gradient-to-b from-current to-transparent opacity-20`}
        />
      </div>
    </section>
  );
}
