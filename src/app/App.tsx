import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/theme-context";
import { LanguageProvider } from "./contexts/language-context";
import { SidebarProvider } from "./contexts/sidebar-context";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}