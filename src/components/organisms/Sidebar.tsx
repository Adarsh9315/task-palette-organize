
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutBoard, 
  Plus, 
  Settings, 
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const boards = useRecoilValue(boardsState);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.aside 
      initial={{ width: collapsed ? 80 : 250 }}
      animate={{ width: collapsed ? 80 : 250 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col",
        "fixed left-0 top-0 z-20 md:relative",
        collapsed ? "items-center" : ""
      )}
    >
      {/* Sidebar header with logo */}
      <div className={cn(
        "h-16 px-4 border-b border-border flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <LayoutBoard size={24} className="text-primary" />
            <span className="font-bold text-lg">TaskPalette</span>
          </Link>
        )}
        {collapsed && (
          <LayoutBoard size={24} className="text-primary" />
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("rounded-full p-0 h-8 w-8", collapsed && "mt-0")}
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Main sidebar content */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col">
        {/* Search */}
        <div className={cn("px-4 mb-4", collapsed && "hidden")}>
          <div className="relative">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input 
              type="text" 
              placeholder="Search boards..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-secondary/50 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Boards section */}
        <div className="mt-2">
          <div className={cn(
            "px-4 mb-2 flex items-center justify-between",
            collapsed && "justify-center px-0"
          )}>
            {!collapsed && <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Boards</span>}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Link to="/board/new">
                      <Plus size={16} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Create New Board</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className={cn("space-y-1 px-2", collapsed && "items-center flex flex-col")}>
            {filteredBoards.map((board) => (
              <TooltipProvider key={board.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to={`/board/${board.id}`} 
                      className={cn(
                        "flex items-center px-2 py-2 rounded-md text-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        location.pathname === `/board/${board.id}` && "bg-accent text-accent-foreground",
                        collapsed ? "justify-center w-10 h-10" : "w-full"
                      )}
                    >
                      <LayoutBoard size={collapsed ? 20 : 16} className={cn(!collapsed && "mr-2")} />
                      {!collapsed && (
                        <span className="truncate">{board.title}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{board.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar footer with user and settings */}
      <div className={cn(
        "h-16 px-4 border-t border-border flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "rounded-full p-0 h-8 w-8",
                  collapsed && "mt-0"
                )}
              >
                <Link to="/settings">
                  <Settings size={16} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.aside>
  );
};
