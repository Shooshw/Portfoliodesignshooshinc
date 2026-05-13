import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check if user has a saved preference (desktop only)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  }
  
  // Otherwise, use system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  return prefersDark.matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a manual preference
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Only save to localStorage on desktop (when toggle is used)
    if (window.innerWidth >= 768) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}