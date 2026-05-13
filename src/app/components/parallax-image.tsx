import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function ParallaxImage({ containerClassName, className, style, src, alt, ...props }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000 }}
      className={`relative w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl group ${containerClassName || ""}`}
    >
      <motion.div
        style={{ rotateX, y, scale }}
        className="w-full h-full transform-gpu"
      >
        <ImageWithFallback
          src={src || ""}
          alt={alt || ""}
          style={{ objectFit: "cover", width: "100%", height: "100%", ...style }}
          className={`group-hover:saturate-150 transition-all duration-700 ${className || ""}`}
          {...props}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
      </motion.div>
    </motion.div>
  );
}
