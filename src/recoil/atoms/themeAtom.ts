
import { atom } from "recoil";

export type ThemeMode = "light" | "dark";
export type ColorScheme = "blue" | "green" | "purple" | "amber" | "rose" | "default";

export type ThemeState = {
  mode: ThemeMode;
  colorScheme?: ColorScheme;
  useSystemTheme?: boolean;
};

// Try to get theme from localStorage if it exists
const getInitialTheme = (): ThemeState => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        // If parsing fails, return default
      }
    }
    
    // Check if system prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return {
      mode: prefersDark ? "dark" : "light",
      colorScheme: "blue",
      useSystemTheme: true,
    };
  }
  
  return {
    mode: "light",
    colorScheme: "blue",
    useSystemTheme: false,
  };
};

export const themeState = atom<ThemeState>({
  key: "themeState",
  default: getInitialTheme(),
});
