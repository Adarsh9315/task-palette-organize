
import { useState } from "react";
import { AppHeader } from "@/components/organisms/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/molecules/UserProfileForm";
import { ThemeSettings } from "@/components/molecules/ThemeSettings";
import { DatabaseSettings } from "@/components/molecules/DatabaseSettings";
import { ProjectSettings } from "@/components/molecules/ProjectSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Palette, Database, Layout } from "lucide-react";

export const SettingsTemplate = () => {
  const [activeTab, setActiveTab] = useState("project");
  
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
                defaultValue="project" 
                orientation="vertical" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto items-stretch bg-transparent space-y-1">
                  <TabsTrigger 
                    value="project" 
                    className="justify-start px-4 py-2 text-left flex items-center"
                  >
                    <Layout className="mr-2 h-4 w-4" />
                    Project
                  </TabsTrigger>
                  <TabsTrigger 
                    value="database" 
                    className="justify-start px-4 py-2 text-left flex items-center"
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Database
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile" 
                    className="justify-start px-4 py-2 text-left flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="theme" 
                    className="justify-start px-4 py-2 text-left flex items-center"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Theme
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="project" className="m-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Project Settings
                  </CardTitle>
                  <CardDescription>
                    Configure general project settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectSettings />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="database" className="m-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure database connections for your application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatabaseSettings />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="profile" className="m-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
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
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme
                  </CardTitle>
                  <CardDescription>
                    Customize your theme preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeSettings />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};
