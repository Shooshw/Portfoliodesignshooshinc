import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { gsap } from "gsap";

export function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    let cw = 0;
    let ch = 0;
    let dpr = window.devicePixelRatio || 1;

    const T = Math.PI * 2;
    const m = { x: window.innerWidth / 2, y: window.innerHeight / 2, s: 1.2, x2: window.innerWidth / 2, y2: window.innerHeight / 2 };

    const xTo = gsap.quickTo(m, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(m, "y", { duration: 0.8, ease: "power3.out" });
    const sTo = gsap.quickTo(m, "s", { duration: 1.5, ease: "power2.out" });
    
    let boxes: Array<{ x: number; y: number; d: number; s: number }> = [];

    // Gerenciador de Estilos da Hero: detecta o tema dinamicamente e otimiza o contraste
    const getHeroStyles = (dark: boolean) => {
      return {
        imgSrc: dark 
          ? "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000" // Purple/blue 3D cubic recursive fractal structure
          : "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2000", // Vibrant high-contrast 3D flow for Light Mode
        // Cores altamente contrastantes e vibrantes para que os pontos decorativos fiquem perfeitamente visíveis em qualquer tela
        dotColor: dark 
          ? "rgba(180, 192, 255, 0.45)" // Blue/purple pastel nítido para fundo escuro
          : "rgba(200, 57, 43, 0.38)",  // Rubi profundo vibrante com alta legibilidade contra o off-white/cores vibrantes
        bgOpacity: dark ? 0.22 : 0.12, // Reduzido no claro para garantir harmonia e visibilidade
        ringColor: dark ? "rgba(255, 255, 255, 0.15)" : "rgba(200, 57, 43, 0.25)", // Anel físico do vidro
        centerDotColor: dark ? "rgba(255, 255, 255, 0.75)" : "rgba(200, 57, 43, 0.85)", // Ponto guia do ponteiro
        lensIntensity: dark ? 0.45 : 0.50, // Força de magnificação óptica
        boxSize: 80, // Grid de alta densidade
        dots: true,
        fade: true
      };
    };

    const props = getHeroStyles(isDark);

    ctx.fillStyle = props.dotColor;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.imgSrc;

    let isImageLoaded = false;
    img.onload = () => {
      isImageLoaded = true;
      initCanvas();
    };

    function initImg() {
      boxes = [];
      const boxSize = props.boxSize;
      // Adicionamos margem de segurança para cobrir as bordas da tela inteiramente
      for (let x = -boxSize; x <= cw + boxSize; x += boxSize) {
        for (let y = -boxSize; y <= ch + boxSize; y += boxSize) {
          boxes.push({ x, y, d: 0, s: 0 });
        }
      }
    }

    function initCanvas() {
      const rect = c.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      
      // Ajusta tamanho físico real considerando DPR para máxima nitidez (Retina ready)
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      
      // Coordenadas lógicas do espaço CSS para o canvas
      cw = rect.width;
      ch = rect.height;
      
      initImg();
    }

    function drawImg(box: { x: number; y: number; d: number; s: number }, sx: number, sy: number, sw: number, sh: number) {
      box.d = Math.hypot(box.x - m.x, box.y - m.y);
      // O raio da lente de distorção se ajusta de forma proporcional ao viewport do usuário
      const baseRadius = Math.min(cw, ch) * 0.22;
      const activeRadius = Math.max(160, baseRadius * m.s);
      
      box.s = 1 - gsap.utils.clamp(0, 1, box.d / activeRadius);
      if (box.s < 0.001) {
        box.s = 0;
        return;
      }
      
      // Mapeia de forma 100% proporcional as coordenadas do canvas para a imagem original
      const normX = box.x / cw;
      const normY = box.y / ch;
      const normSizeX = props.boxSize / cw;
      const normSizeY = props.boxSize / ch;

      const sourceX = sx + normX * sw;
      const sourceY = sy + normY * sh;
      const sourceW = normSizeX * sw;
      const sourceH = normSizeY * sh;

      // Efeito de magnificação esférica realista da lente de vidro
      const centerX = sourceX + sourceW / 2;
      const centerY = sourceY + sourceH / 2;
      const scaledW = sourceW * (1 - box.s * props.lensIntensity);
      const scaledH = sourceH * (1 - box.s * props.lensIntensity);
      const originX = centerX - scaledW / 2;
      const originY = centerY - scaledH / 2;

      if (props.fade) {
        ctx!.globalAlpha = isDark ? box.s : box.s * 0.95;
      }
      
      ctx!.drawImage(
        img,
        originX,
        originY,
        scaledW,
        scaledH,
        box.x,
        box.y,
        props.boxSize,
        props.boxSize
      );
    }

    function drawDots(box: { x: number; y: number; d: number; s: number }) {
      if (box.s < 0.001) return;
      ctx!.beginPath();
      ctx!.arc(box.x, box.y, props.boxSize * 0.16 * box.s, 0, T);
      ctx!.fill();
    }

    function update() {
      if (!isImageLoaded) return;
      const d = Math.hypot(m.x - m.x2, m.y - m.y2);
      // Reatividade dinâmica do foco óptico
      sTo(0.8 + (d / cw) * 4.0); 

      // Configuração de transformação e limpeza limpa do frame Retina
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cw, ch);
      
      // Enquadramento 'cover' matemático centralizado e perfeito da imagem original no canvas
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      let sx = 0;
      let sy = 0;

      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = img.naturalWidth / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }

      // 1. Desenhar fundo em opacidade controlada
      ctx!.globalAlpha = props.bgOpacity;
      ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      
      // 2. Desenhar caixas sob o efeito de distorção óptica da lente
      ctx!.globalAlpha = 1;
      boxes.forEach(box => drawImg(box, sx, sy, sw, sh));
      
      // 3. Desenhar pontos de respiro geométricos de alto contraste
      if (props.fade) ctx!.globalAlpha = 1;
      if (props.dots) {
        ctx!.fillStyle = props.dotColor;
        boxes.forEach(drawDots);
      }

      // 4. Desenhar anel físico de vidro dinâmico no cursor
      const baseRadius = Math.min(cw, ch) * 0.22;
      const activeRadius = Math.max(160, baseRadius * m.s);
      
      ctx!.beginPath();
      ctx!.arc(m.x, m.y, activeRadius, 0, T);
      ctx!.lineWidth = 3;
      ctx!.strokeStyle = props.ringColor;
      ctx!.stroke();

      // 5. Desenhar ponto de mira minimalista
      ctx!.beginPath();
      ctx!.arc(m.x, m.y, 4, 0, T);
      ctx!.fillStyle = props.centerDotColor;
      ctx!.fill();
    }

    gsap.ticker.add(update);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      m.x2 = e.clientX - rect.left;
      m.y2 = e.clientY - rect.top;
      xTo(m.x2);
      yTo(m.y2);
    };

    const handleResize = () => {
      initCanvas();
    };

    const parent = containerRef.current;
    if (parent) {
      parent.addEventListener("pointermove", handlePointerMove);
    }
    window.addEventListener("resize", handleResize);

    // Inicialização forçada para garantir renderização correta
    initCanvas();

    return () => {
      gsap.ticker.remove(update);
      if (parent) {
        parent.removeEventListener("pointermove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center transition-colors duration-700 ${isDark ? "bg-black text-white" : "bg-[#FAF9F6] text-[#0D0D0D]"}`}
    >
      {/* Background Canvas Layer */}
      <div className="absolute inset-0 overflow-hidden w-full h-full z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: isDark ? 0.65 : 0.88,
            filter: isDark ? "brightness(0.9) contrast(1.1)" : "saturate(1.1) contrast(1.15)"
          }}
        />
        {/* Ambient Overlay */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${isDark ? "bg-black/45" : "bg-transparent"}`} />
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
