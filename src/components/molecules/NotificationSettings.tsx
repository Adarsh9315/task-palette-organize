
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [boardUpdates, setBoardUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const saveNotificationSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Notification settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose when and how you want to receive notifications.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifs" className="font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch
            id="email-notifs"
            checked={emailNotifs}
            onCheckedChange={setEmailNotifs}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="task-reminders" className="font-medium">Task Reminders</Label>
            <p className="text-sm text-muted-foreground">Get reminders for upcoming due dates</p>
          </div>
          <Switch
            id="task-reminders"
            checked={taskReminders}
            onCheckedChange={setTaskReminders}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="mentions" className="font-medium">@Mentions</Label>
            <p className="text-sm text-muted-foreground">Notify when someone mentions you</p>
          </div>
          <Switch
            id="mentions"
            checked={mentions}
            onCheckedChange={setMentions}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="board-updates" className="font-medium">Board Updates</Label>
            <p className="text-sm text-muted-foreground">Get notified about board changes</p>
          </div>
          <Switch
            id="board-updates"
            checked={boardUpdates}
            onCheckedChange={setBoardUpdates}
          />
        </div>
      </div>
      
      <Button onClick={saveNotificationSettings} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save preferences"}
      </Button>
    </div>
  );
}
