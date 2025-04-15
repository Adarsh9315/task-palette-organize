
import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRecoilState } from "recoil";
import { themeState, ThemeMode } from "@/recoil/atoms/themeAtom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newMode: ThemeMode = theme.mode === "dark" ? "light" : "dark";
    const newTheme = { ...theme, mode: newMode, useSystemTheme: false };
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));

    // Manually update the class on document element
    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSystemTheme = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const newMode: ThemeMode = prefersDark ? "dark" : "light";
    const useSystemTheme = !theme.useSystemTheme;
    const newTheme = { 
      ...theme, 
      mode: newMode,
      useSystemTheme
    };
    
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));

    // Manually update the class on document element
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Force recheck dark mode on mount
  useEffect(() => {
    if (theme.useSystemTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      if (theme.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mounted, theme]);

  // Don't render anything on the server or until mounted on client
  if (!mounted) return null;

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                {theme.useSystemTheme ? (
                  <Monitor className="h-[1.2rem] w-[1.2rem]" />
                ) : theme.mode === "dark" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Theme settings</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="w-60" align="end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-medium">Appearance</h4>
            <div className="flex items-center space-x-4">
              <Button 
                variant={theme.mode === "light" && !theme.useSystemTheme ? "default" : "outline"} 
                size="sm"
                className="flex-1"
                onClick={() => {
                  document.documentElement.classList.remove("dark");
                  setTheme({ ...theme, mode: "light", useSystemTheme: false });
                  localStorage.setItem("theme", JSON.stringify({ ...theme, mode: "light", useSystemTheme: false }));
                }}
              >
                <Sun className="mr-1 h-4 w-4" />
                Light
              </Button>
              <Button 
                variant={theme.mode === "dark" && !theme.useSystemTheme ? "default" : "outline"} 
                size="sm"
                className="flex-1"
                onClick={() => {
                  document.documentElement.classList.add("dark");
                  setTheme({ ...theme, mode: "dark", useSystemTheme: false });
                  localStorage.setItem("theme", JSON.stringify({ ...theme, mode: "dark", useSystemTheme: false }));
                }}
              >
                <Moon className="mr-1 h-4 w-4" />
                Dark
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="system-theme" 
                checked={theme.useSystemTheme}
                onCheckedChange={toggleSystemTheme}
              />
              <Label htmlFor="system-theme" className="cursor-pointer">
                <div className="flex items-center">
                  <Monitor className="mr-1 h-4 w-4" />
                  Use system theme
                </div>
              </Label>
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
