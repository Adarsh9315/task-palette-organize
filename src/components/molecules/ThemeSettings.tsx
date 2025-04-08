
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Monitor } from "lucide-react";
import { useRecoilState } from "recoil";
import { themeState } from "@/recoil/atoms/themeAtom";
import { toast } from "sonner";

export function ThemeSettings() {
  const [theme, setTheme] = useRecoilState(themeState);
  const [colorScheme, setColorScheme] = useState(theme.colorScheme || "blue");
  const [useSystemTheme, setUseSystemTheme] = useState(theme.useSystemTheme || false);
  
  // Update the theme in localStorage and document when it changes
  useEffect(() => {
    if (useSystemTheme) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", theme.mode === "dark");
    }
    
    // Add color scheme class
    document.documentElement.dataset.colorScheme = colorScheme;
    
    // Save to localStorage
    localStorage.setItem("theme", JSON.stringify({
      ...theme,
      colorScheme,
      useSystemTheme
    }));
  }, [theme, colorScheme, useSystemTheme]);
  
  const updateTheme = (mode: "light" | "dark") => {
    setTheme({
      ...theme,
      mode,
      useSystemTheme: false
    });
    setUseSystemTheme(false);
    toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode activated`);
  };
  
  const toggleSystemTheme = () => {
    setUseSystemTheme(!useSystemTheme);
    if (!useSystemTheme) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme({
        ...theme,
        mode: isDark ? "dark" : "light",
        useSystemTheme: true
      });
      toast.success("Using system theme preference");
    }
  };
  
  const updateColorScheme = (newColorScheme: string) => {
    setColorScheme(newColorScheme);
    setTheme({
      ...theme,
      colorScheme: newColorScheme
    });
    toast.success(`Color scheme updated to ${newColorScheme}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the application.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Theme Mode</h4>
          <div className="flex flex-col gap-4">
            <Tabs defaultValue={theme.mode} className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger 
                  value="light" 
                  onClick={() => updateTheme("light")}
                  className="flex items-center gap-2"
                >
                  <Sun size={16} />
                  <span>Light</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="dark" 
                  onClick={() => updateTheme("dark")}
                  className="flex items-center gap-2"
                >
                  <Moon size={16} />
                  <span>Dark</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="system"
                  className="flex items-center gap-2"
                  disabled={!useSystemTheme}
                >
                  <Monitor size={16} />
                  <span>System</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="use-system" 
                checked={useSystemTheme}
                onCheckedChange={toggleSystemTheme}
              />
              <Label htmlFor="use-system">Use system theme preference</Label>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">Color Scheme</h4>
          <RadioGroup 
            value={colorScheme} 
            onValueChange={updateColorScheme}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue" id="blue" />
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
              <Label htmlFor="blue">Blue</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="green" id="green" />
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
              <Label htmlFor="green">Green</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="purple" id="purple" />
              <div className="w-8 h-8 rounded-full bg-purple-500"></div>
              <Label htmlFor="purple">Purple</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="orange" id="orange" />
              <div className="w-8 h-8 rounded-full bg-orange-500"></div>
              <Label htmlFor="orange">Orange</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
