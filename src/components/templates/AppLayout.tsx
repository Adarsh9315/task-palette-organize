
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/organisms/Sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AppHeader } from "@/components/organisms/AppHeader";
import { useMediaQuery } from "@/hooks/use-media-query";

export const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // Collapse sidebar by default on mobile
  useEffect(() => {
    setSidebarCollapsed(!isDesktop);
  }, [isDesktop]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isDesktop) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setMobileSidebarOpen(!mobileSidebarOpen);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      {isDesktop && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
      )}
      
      {/* Mobile sidebar - shown when mobileSidebarOpen is true */}
      {!isDesktop && mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileSidebarOpen(false)}>
          <div className="h-full w-64" onClick={(e) => e.stopPropagation()}>
            <Sidebar 
              collapsed={false} 
              onToggle={() => setMobileSidebarOpen(false)} 
            />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col w-full transition-all duration-200",
        isDesktop && !sidebarCollapsed && "md:ml-[250px]",
        isDesktop && sidebarCollapsed && "md:ml-[80px]",
      )}>
        <div className="sticky top-0 z-10 w-full">
          <AppHeader>
            {!isDesktop && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2" 
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu size={20} />
                <span className="sr-only">Menu</span>
              </Button>
            )}
          </AppHeader>
        </div>
        
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
