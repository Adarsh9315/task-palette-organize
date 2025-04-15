
import { SettingsTemplate } from "@/components/templates/SettingsTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSettings } from "@/components/molecules/ThemeSettings";
import { ProjectSettings } from "@/components/molecules/ProjectSettings";
import { NotificationSettings } from "@/components/molecules/NotificationSettings";
import { SecuritySettings } from "@/components/molecules/SecuritySettings";
import { UserProfile } from "@/components/molecules/UserProfile";
import { DatabaseSettings } from "@/components/molecules/DatabaseSettings";

const Settings = () => {
  return (
    <SettingsTemplate>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
        <TabsContent value="theme">
          <ThemeSettings />
        </TabsContent>
        <TabsContent value="project">
          <ProjectSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="database">
          <DatabaseSettings />
        </TabsContent>
      </Tabs>
    </SettingsTemplate>
  );
};

export default Settings;
