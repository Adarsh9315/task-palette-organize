
import { atom } from "recoil";

type ThemeMode = "light" | "dark";

export type ThemeState = {
  mode: ThemeMode;
  colorScheme?: string;
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
