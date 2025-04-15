
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { 
  Layout, 
  Plus,
  Sun, 
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { themeState } from "@/recoil/atoms/themeAtom";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const boards = useRecoilValue(boardsState);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useRecoilState(themeState);
  
  const boardCount = boards.length;
  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleTheme = () => {
    const newMode = theme.mode === "dark" ? "light" : "dark";
    setTheme({ ...theme, mode: newMode, useSystemTheme: false });
  };

  return (
    <motion.aside 
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "h-screen flex flex-col",
        "fixed left-0 top-0 z-20 md:relative",
        collapsed ? "items-center" : "",
        "dark:bg-[#1A1F2C] border-r border-border/30"
      )}
    >
      {/* Sidebar header with logo */}
      <div className={cn(
        "h-16 px-4 flex items-center",
        collapsed ? "justify-center" : "justify-start",
      )}>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="text-primary flex space-x-1 items-center">
              <div className="h-5 w-1 rounded-sm bg-primary"></div>
              <div className="h-5 w-1 rounded-sm bg-primary/70"></div>
              <div className="h-5 w-1 rounded-sm bg-primary/40"></div>
            </div>
            <span className="font-bold text-lg text-white ml-2">kanban</span>
          </div>
        )}
        {collapsed && (
          <div className="text-primary flex flex-col items-center space-y-1">
            <div className="h-1 w-5 rounded-sm bg-primary"></div>
            <div className="h-1 w-5 rounded-sm bg-primary/70"></div>
            <div className="h-1 w-5 rounded-sm bg-primary/40"></div>
          </div>
        )}
      </div>

      {/* All boards counter */}
      {!collapsed && (
        <div className="px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">ALL BOARDS ({boardCount})</p>
        </div>
      )}
      
      {/* Main sidebar content */}
      <div className="flex-1 overflow-y-auto py-2 flex flex-col">        
        <div className={cn("space-y-1 px-2", collapsed && "items-center flex flex-col")}>
          {filteredBoards.length > 0 ? (
            filteredBoards.map((board) => (
              <Link 
                key={board.id}
                to={`/board/${board.id}`} 
                className={cn(
                  "flex items-center px-4 py-3 rounded-r-full text-sm transition-colors",
                  location.pathname === `/board/${board.id}` 
                    ? "bg-primary text-white font-medium" 
                    : "text-gray-400 hover:text-gray-200",
                  collapsed ? "justify-center w-10 h-10" : "w-full",
                )}
              >
                <Layout size={collapsed ? 20 : 16} className={cn(!collapsed && "mr-3")} />
                {!collapsed && (
                  <span className="truncate font-medium">{board.title}</span>
                )}
              </Link>
            ))
          ) : (
            <div className={cn(
              "text-center py-2 text-sm text-muted-foreground",
              collapsed && "hidden"
            )}>
              No boards found
            </div>
          )}
          
          <Link 
            to="/board/new"
            className={cn(
              "flex items-center px-4 py-3 rounded-r-full text-sm transition-colors text-primary hover:bg-primary/10",
              collapsed ? "justify-center w-10 h-10" : "w-full"
            )}
          >
            <Plus size={collapsed ? 20 : 16} className={cn(!collapsed && "mr-3")} />
            {!collapsed && (
              <span className="truncate font-medium">+ Create New Board</span>
            )}
          </Link>
        </div>
      </div>

      {/* Theme toggle at bottom */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-center justify-center bg-secondary/50 rounded-md p-3 mb-2">
          <Sun size={16} className="text-gray-400 mr-2" />
          <div className="relative mx-2">
            <input 
              type="checkbox"
              checked={theme.mode === "dark"}
              onChange={toggleTheme}
              className="sr-only"
              id="theme-toggle"
            />
            <label 
              htmlFor="theme-toggle"
              className={`block h-6 w-12 rounded-full cursor-pointer ${theme.mode === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span 
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform transform ${theme.mode === 'dark' ? 'translate-x-6' : ''}`}
              />
            </label>
          </div>
          <Moon size={16} className="text-gray-400" />
        </div>
      </div>
    </motion.aside>
  );
};
