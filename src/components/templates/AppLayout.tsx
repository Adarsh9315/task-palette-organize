
import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Sidebar } from "@/components/organisms/Sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AppHeader } from "@/components/organisms/AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Collapse sidebar by default on mobile
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (!isMobile) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setMobileSidebarOpen(!mobileSidebarOpen);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className={cn(
        "fixed top-0 h-full z-40 transition-all duration-300 ease-in-out",
        !isMobile && !sidebarCollapsed ? "translate-x-0 w-64" : "w-0 -translate-x-full",
        !isMobile && sidebarCollapsed && "w-20 translate-x-0"
      )}>
        {(!isMobile || mobileSidebarOpen) && (
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
          />
        )}
      </div>
      
      {/* Mobile sidebar overlay - shown when mobileSidebarOpen is true */}
      {isMobile && mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div 
            className="fixed top-0 left-0 h-full w-64 z-50" 
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              collapsed={false} 
              onToggle={() => setMobileSidebarOpen(false)} 
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col w-full transition-all duration-300 ease-in-out",
        !isMobile && !sidebarCollapsed ? "lg:ml-64" : "",
        !isMobile && sidebarCollapsed ? "lg:ml-20" : "",
      )}>
        <div className="sticky top-0 z-30 w-full bg-background">
          <AppHeader>
            {/* Toggle button for sidebar on mobile/desktop */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </AppHeader>
        </div>
        
        <main className="flex-1 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
