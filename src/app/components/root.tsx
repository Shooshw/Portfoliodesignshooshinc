import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./header";
import { Sidebar } from "./sidebar-menu";
import { MobileFooter } from "./mobile-footer";
import { Progress } from "./ui/progress";
import { useTheme } from "../contexts/theme-context";
import { useLanguage } from "../contexts/language-context";
import { Loader } from "./ui/loader";
import Lenis from "lenis";
import { gsap } from "gsap";

export function Root() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    // Inicializar Lenis para uma rolagem ultra-suave com inércia premium
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial premium (expoOut)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Sincronizar Lenis com o ticker do GSAP para renderização de alta precisão
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Monitorar o progresso real da rolagem e atualizar a barra de progresso do site
    lenis.on("scroll", (e) => {
      setScrollProgress(e.progress * 100);
    });

    // Pausar Lenis automaticamente se o body estiver com "overflow: hidden" ou durante loading inicial/de página
    const observer = new MutationObserver(() => {
      const isScrollBlocked = document.body.style.overflow === "hidden" || isInitialLoading || isPageLoading;
      if (isScrollBlocked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Guardar a referência no window para controle global se necessário
    (window as any).lenis = lenis;

    return () => {
      gsap.ticker.remove(updateLenis);
      observer.disconnect();
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, [isInitialLoading, isPageLoading]);

  // Simular tela de carregamento inicial do portfólio
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // Simular transição entre páginas
  useEffect(() => {
    if (isInitialLoading) return;
    
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Rolar para o topo instantaneamente nas mudanças de rota
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const bg = isDark ? "bg-black" : "bg-[#F5F5F3]";
  const text = isDark ? "text-white" : "text-[#0D0D0D]";
  const accentColor = isDark ? "text-[#3054ff]" : "text-[#C8392B]";

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bg} ${text}`}>
      {/* Preloader inicial e transição de página */}
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.8, 0, 0, 1] }}
            className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center ${bg} ${text}`}
          >
            <div className="flex flex-col items-center">
              <Loader className={accentColor} />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 font-sans text-xs font-bold tracking-[0.3em] uppercase text-center"
              >
                {t("loader.welcome")}
              </motion.p>
            </div>
          </motion.div>
        )}

        {isPageLoading && !isInitialLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-[990] flex flex-col items-center justify-center ${isDark ? "bg-black/85" : "bg-[#F5F5F3]/85"} backdrop-blur-lg ${text}`}
          >
            <div className="flex flex-col items-center">
              <Loader className={accentColor} />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                className="mt-6 font-sans text-xs font-bold tracking-[0.3em] uppercase text-center"
              >
                {t("loader.transition")}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar Container */}
      <div className="fixed top-0 left-0 right-0 z-[250] h-1.5 w-full bg-transparent overflow-hidden">
        <motion.div 
          className={`h-full origin-left transition-all ${isDark ? "bg-[#3054ff] shadow-[0_0_10px_#3054ff]" : "bg-[#C8392B] shadow-[0_0_10px_#C8392B]"}`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />
      <Sidebar />

      <main className="relative">
        <Outlet />
      </main>

      <MobileFooter />
    </div>
  );
}