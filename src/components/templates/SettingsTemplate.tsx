
import { useState } from "react";
import { AppHeader } from "@/components/organisms/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/molecules/UserProfileForm";
import { NotificationSettings } from "@/components/molecules/NotificationSettings";
import { SecuritySettings } from "@/components/molecules/SecuritySettings";
import { ThemeSettings } from "@/components/molecules/ThemeSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const SettingsTemplate = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your preferences.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs 
                defaultValue="profile" 
                orientation="vertical" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto items-stretch bg-transparent space-y-1">
                  <TabsTrigger 
                    value="profile" 
                    className="justify-start px-4 py-2 text-left"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="theme" 
                    className="justify-start px-4 py-2 text-left"
                  >
                    Theme
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start px-4 py-2 text-left"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start px-4 py-2 text-left"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="profile" className="m-0">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProfileForm />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="theme" className="m-0">
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Customize your theme preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeSettings />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NotificationSettings />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Update your security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SecuritySettings />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};
