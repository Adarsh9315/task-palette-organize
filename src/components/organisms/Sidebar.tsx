import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { Layout, Plus, Sun, Moon, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { themeState } from "@/recoil/atoms/themeAtom";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const boards = useRecoilValue(boardsState);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useRecoilState(themeState);
  
  const boardCount = boards.length;
  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleTheme = () => {
    const newMode = theme.mode === "dark" ? "light" : "dark";
    setTheme({ ...theme, mode: newMode, useSystemTheme: false });
  };

  const handleAllBoardsClick = () => {
    navigate('/');
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col",
        "w-full bg-sidebar z-20",
        "border-r border-border/30",
        collapsed ? "items-center" : "",
        theme.mode === "dark" ? "bg-[#1A1F2C]" : "bg-white"
      )}
    >
      {/* Sidebar header with logo */}
      <div className={cn(
        "h-16 px-4 flex items-center",
        collapsed ? "justify-center" : "justify-between",
      )}>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="text-primary flex space-x-1 items-center">
              <div className="h-5 w-1 rounded-sm bg-primary"></div>
              <div className="h-5 w-1 rounded-sm bg-primary/70"></div>
              <div className="h-5 w-1 rounded-sm bg-primary/40"></div>
            </div>
            <span className="font-bold text-lg text-foreground ml-2">kanban</span>
          </div>
        )}
        {collapsed && (
          <div className="text-primary flex flex-col items-center space-y-1">
            <div className="h-1 w-5 rounded-sm bg-primary"></div>
            <div className="h-1 w-5 rounded-sm bg-primary/70"></div>
            <div className="h-1 w-5 rounded-sm bg-primary/40"></div>
          </div>
        )}
        
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>

      {/* All boards counter - now clickable */}
      {!collapsed && (
        <div 
          onClick={handleAllBoardsClick} 
          className="px-6 py-4 cursor-pointer hover:bg-accent/50 transition-colors"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            ALL BOARDS ({boardCount})
          </p>
        </div>
      )}
      
      {/* Main sidebar content remains the same */}
      <ScrollArea className="flex-1">
        <div className={cn("py-2", collapsed && "items-center flex flex-col")}>
          {filteredBoards.length > 0 ? (
            filteredBoards.map((board) => (
              <Link 
                key={board.id}
                to={`/board/${board.id}`} 
                className={cn(
                  "flex items-center px-4 py-3 mx-2 rounded-r-full text-sm transition-colors",
                  location.pathname === `/board/${board.id}` 
                    ? "bg-primary text-white font-medium" 
                    : "text-muted-foreground hover:text-foreground",
                  collapsed ? "justify-center w-10 h-10" : "w-[calc(100%-16px)]",
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
              "flex items-center px-4 py-3 mx-2 rounded-r-full text-sm transition-colors text-primary hover:bg-primary/10",
              collapsed ? "justify-center w-10 h-10" : "w-[calc(100%-16px)]"
            )}
          >
            <Plus size={collapsed ? 20 : 16} className={cn(!collapsed && "mr-3")} />
            {!collapsed && (
              <span className="truncate font-medium">+ Create New Board</span>
            )}
          </Link>
        </div>
      </ScrollArea>

      {/* Theme toggle and other existing sections remain the same */}
      <div className="p-4 mt-auto">
        <div className={cn(
          "flex items-center justify-center bg-secondary/50 rounded-md p-3 mb-2",
          collapsed ? "flex-col" : "flex-row"
        )}>
          {!collapsed && <Sun size={16} className="text-muted-foreground mr-2" />}
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
          {!collapsed && <Moon size={16} className="text-muted-foreground" />}
        </div>
        
        {/* Settings button */}
        <Link 
          to="/settings"
          className={cn(
            "flex items-center px-4 py-3 mx-2 rounded-r-full text-sm transition-colors text-muted-foreground hover:bg-accent hover:text-foreground",
            collapsed ? "justify-center w-10 h-10" : "w-[calc(100%-16px)]"
          )}
        >
          <Settings size={collapsed ? 20 : 16} className={cn(!collapsed && "mr-3")} />
          {!collapsed && (
            <span className="truncate font-medium">Settings</span>
          )}
        </Link>
        
        {collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full flex items-center justify-center mt-4"
          >
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
