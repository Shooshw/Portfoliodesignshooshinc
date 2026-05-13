import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/theme-context";
import { LanguageProvider } from "./contexts/language-context";
import { SidebarProvider } from "./contexts/sidebar-context";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
          <Analytics />
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}