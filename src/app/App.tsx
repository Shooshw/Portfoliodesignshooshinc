import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/theme-context";
import { LanguageProvider } from "./contexts/language-context";
import { SidebarProvider } from "./contexts/sidebar-context";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
          <SpeedInsights />
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}