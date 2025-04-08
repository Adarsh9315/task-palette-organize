
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckSquare, Info, Menu, X, Settings, User, LogOut, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { themeState } from "@/recoil/atoms/themeAtom";
import { useRecoilState } from "recoil";

export const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useRecoilState(themeState);
  
  const toggleTheme = () => {
    setTheme({
      ...theme,
      mode: theme.mode === "light" ? "dark" : "light",
      useSystemTheme: false
    });
  };
  
  return (
    <header className="bg-card border-b border-slate-200 dark:border-slate-700 py-4 px-4 md:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CheckSquare size={24} className="text-primary" />
          <span className="font-bold text-lg">TaskPalette</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/">Boards</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button asChild>
            <Link to="/board/new">New Board</Link>
          </Button>
          
          <div className="ml-4 flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme.mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={20} />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center mb-6">
                <Avatar className="h-9 w-9 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              
              <Button variant="ghost" asChild>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Boards
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                  Settings
                </Link>
              </Button>
              <Button asChild>
                <Link to="/board/new" onClick={() => setIsMobileMenuOpen(false)}>
                  New Board
                </Link>
              </Button>
              
              <div className="flex items-center mt-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-start w-full"
                >
                  {theme.mode === "light" ? (
                    <>
                      <Moon size={16} className="mr-2" /> 
                      <span>Switch to Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun size={16} className="mr-2" />
                      <span>Switch to Light Mode</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
