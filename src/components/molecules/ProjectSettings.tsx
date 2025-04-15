
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { projectSettingsState, ProjectSettings as ProjectSettingsType } from "@/recoil/atoms/projectSettingsAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Define the schema for project settings
const projectSettingsSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  description: z.string().optional(),
});

type ProjectSettingsValues = z.infer<typeof projectSettingsSchema>;

export function ProjectSettings() {
  const [projectSettings, setProjectSettings] = useRecoilState(projectSettingsState);
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultValues: ProjectSettingsType = projectSettings || {
    projectName: "TaskPalette",
    description: "A task management app with Kanban board functionality."
  };
  
  const form = useForm<ProjectSettingsValues>({
    resolver: zodResolver(projectSettingsSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProjectSettingsValues) => {
    setIsLoading(true);
    
    try {
      // Store settings in Recoil state - ensure all required fields are present
      setProjectSettings({
        projectName: values.projectName,
        description: values.description
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Project settings updated successfully!");
    } catch (error) {
      console.error("Error saving project settings:", error);
      toast.error("Failed to update project settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Project Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage general settings for your project.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="TaskPalette" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your project..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
