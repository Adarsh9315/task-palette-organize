
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { DbConfig, dbConfigState } from "@/recoil/atoms/dbConfigAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

// Define the schema for database configuration
const dbConfigSchema = z.object({
  dbType: z.enum(["postgresql", "mongodb", "mysql"]),
  host: z.string().min(1, { message: "Host is required" }),
  port: z.string().min(1, { message: "Port is required" }),
  dbName: z.string().min(1, { message: "Database name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function DatabaseSettings() {
  const [dbConfig, setDbConfig] = useRecoilState(dbConfigState);
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultValues: DbConfig = dbConfig || {
    dbType: "postgresql",
    host: "localhost",
    port: "5432",
    dbName: "taskpalette",
    username: "postgres",
    password: "password"
  };
  
  const form = useForm<z.infer<typeof dbConfigSchema>>({
    resolver: zodResolver(dbConfigSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof dbConfigSchema>) => {
    setIsLoading(true);
    
    try {
      // Store config in Recoil state - ensure all required fields are present
      setDbConfig({
        dbType: values.dbType,
        host: values.host,
        port: values.port,
        dbName: values.dbName,
        username: values.username,
        password: values.password
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Database configuration saved successfully!");
    } catch (error) {
      console.error("Error saving database configuration:", error);
      toast.error("Failed to save database configuration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dbType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
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
                    <Input placeholder="5432" {...field} />
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
                    <Input placeholder="postgres" {...field} />
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
                    <Input type="password" placeholder="●●●●●●●" {...field} />
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
      
      {/* JSON Preview */}
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">Configuration Preview</h4>
        <Card className="overflow-hidden">
          <pre className="p-4 text-xs overflow-x-auto bg-muted/50">
            {JSON.stringify(form.getValues(), null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}
