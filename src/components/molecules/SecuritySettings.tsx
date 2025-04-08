
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      form.reset();
      toast.success("Password changed successfully!");
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your password and security settings.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Changing password..." : "Change password"}
          </Button>
        </form>
      </Form>
      
      <div className="pt-4 border-t">
        <h4 className="text-md font-medium mb-2">Sessions</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your active sessions on different devices.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-muted-foreground">Chrome on Windows • Last active now</p>
            </div>
            <Button variant="outline" size="sm">This device</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
            <div>
              <p className="font-medium">Mobile Session</p>
              <p className="text-sm text-muted-foreground">Safari on iPhone • Last active 2 days ago</p>
            </div>
            <Button variant="outline" size="sm">Sign out</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
