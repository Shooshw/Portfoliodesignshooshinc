import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import { Header } from "./header";
import { Sidebar } from "./sidebar-menu";
import { MobileFooter } from "./mobile-footer";
import { Progress } from "./ui/progress";
import { useTheme } from "../contexts/theme-context";

export function Root() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = trackLength > 0 ? (scrollTop / trackLength) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const bg = isDark ? "bg-[#0D0D0D]" : "bg-[#F5F5F3]";
  const text = isDark ? "text-[#F2F2F0]" : "text-[#0D0D0D]";

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bg} ${text}`}>
      {/* Progress Bar Container */}
      <div className="fixed top-0 left-0 right-0 z-[250] h-1.5 w-full bg-transparent overflow-hidden">
        <motion.div 
          className="h-full bg-[#C8392B] origin-left shadow-[0_0_10px_#C8392B]"
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