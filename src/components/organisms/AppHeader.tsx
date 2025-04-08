
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckSquare, Info, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CheckSquare size={24} className="text-primary-blue" />
          <span className="font-bold text-lg">TaskPalette</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Boards</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button asChild>
            <Link to="/board/new">New Board</Link>
          </Button>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={20} />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
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
              <Button asChild>
                <Link to="/board/new" onClick={() => setIsMobileMenuOpen(false)}>
                  New Board
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
