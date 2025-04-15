
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import Index from "./pages/Index";
import BoardDetail from "./pages/BoardDetail";
import BoardForm from "./pages/BoardForm";
import About from "./pages/About";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { themeState } from "./recoil/atoms/themeAtom";
import { AppLayout } from "./components/templates/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/molecules/ProtectedRoute";

const queryClient = new QueryClient();

// Theme Provider component to apply theme changes
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useRecoilValue(themeState);
  
  useEffect(() => {
    // Apply theme mode with transition
    const root = document.documentElement;
    
    if (theme.useSystemTheme) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle("dark", e.matches);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Add transition class before changing theme
      root.classList.add('transition-colors');
      root.classList.add('duration-300');
      
      // Apply theme - force it directly to avoid any flashing
      if (theme.mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      // Store the theme preference in localStorage
      localStorage.setItem("theme", JSON.stringify(theme));
    }
    
    // Apply color scheme
    if (theme.colorScheme) {
      root.dataset.colorScheme = theme.colorScheme;
    }
  }, [theme]);
  
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Index />} />
              <Route path="/board/:boardId" element={<BoardDetail />} />
              <Route path="/board/new" element={<BoardForm />} />
              <Route path="/board/edit/:boardId" element={<BoardForm />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
