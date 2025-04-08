
import { AppHeader } from "@/components/organisms/AppHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, User, Bell, Lock } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useState } from "react";
import { UserProfileForm } from "@/components/molecules/UserProfileForm";
import { ThemeSettings } from "@/components/molecules/ThemeSettings";
import { NotificationSettings } from "@/components/molecules/NotificationSettings";
import { SecuritySettings } from "@/components/molecules/SecuritySettings";

export const SettingsTemplate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex items-center gap-2">
                <Sun size={16} />
                <span className="hidden md:inline">Theme</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={16} />
                <span className="hidden md:inline">Security</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="profile" className="space-y-4">
                <UserProfileForm />
              </TabsContent>
              
              <TabsContent value="theme" className="space-y-4">
                <ThemeSettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <SecuritySettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
