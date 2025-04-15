
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { dbConfigState } from "@/recoil/atoms/dbConfigAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Define the schema for database configuration
const dbConfigSchema = z.object({
  dbType: z.enum(["postgresql", "mongodb", "mysql"]),
  host: z.string().min(1, { message: "Host is required" }),
  port: z.string().min(1, { message: "Port is required" }),
  dbName: z.string().min(1, { message: "Database name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type DbConfigFormValues = z.infer<typeof dbConfigSchema>;

const defaultValues: DbConfigFormValues = {
  dbType: "postgresql",
  host: "localhost",
  port: "",
  dbName: "",
  username: "",
  password: "",
};

export function DatabaseSettings() {
  const [dbConfig, setDbConfig] = useRecoilState(dbConfigState);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<DbConfigFormValues>({
    resolver: zodResolver(dbConfigSchema),
    defaultValues: dbConfig || defaultValues,
  });

  const onSubmit = async (values: DbConfigFormValues) => {
    setIsLoading(true);
    
    try {
      // Store config in Recoil state
      setDbConfig(values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/db/config', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });
      
      // if (!response.ok) throw new Error('Failed to save configuration');
      
      toast.success("Database configuration saved successfully!");
    } catch (error) {
      console.error("Error saving database configuration:", error);
      toast.error("Failed to save database configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultPort = (dbType: string) => {
    switch (dbType) {
      case "postgresql":
        return "5432";
      case "mongodb":
        return "27017";
      case "mysql":
        return "3306";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Database Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure the database connection for your task management system.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dbType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("port", getDefaultPort(value));
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="host"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host</FormLabel>
                  <FormControl>
                    <Input placeholder="localhost" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input placeholder={getDefaultPort(form.getValues('dbType'))} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="dbName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database Name</FormLabel>
                <FormControl>
                  <Input placeholder="taskpalette" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save & Apply"}
          </Button>
        </form>
      </Form>
      
      {dbConfig && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <Label htmlFor="json-preview" className="text-sm font-medium mb-2 block">Configuration Preview</Label>
            <div className="bg-muted rounded-md p-4 overflow-auto">
              <pre className="text-xs" id="json-preview">
                {JSON.stringify(dbConfig, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
