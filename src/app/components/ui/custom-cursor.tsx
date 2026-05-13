import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useTheme } from "../../contexts/theme-context";

export function CustomCursor() {
  const { isDark } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer");

      setIsHovering(!!isSelectable);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C8392B] opacity-50`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isClicking ? 0.8 : 0.4,
          borderWidth: isHovering ? "1px" : "2px",
        }}
      />

      {/* Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C8392B]`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />

      {/* Hover Label (Optional/Experimental) */}
      <motion.div
        className={`fixed top-0 left-0 bg-[#C8392B] text-white text-[0.4rem] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-xl`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "24px",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          x: isHovering ? 24 : 0,
        }}
      >
        View
      </motion.div>
    </div>
  );
}
