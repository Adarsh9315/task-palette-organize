
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { TaskStatus, Task, TaskPriority } from "@/components/molecules/TaskCard";
import { useState } from "react";
import { createTask, updateTask } from "@/services/taskService";
import { toast } from "sonner";

type TaskFormProps = {
  boardId: string;
  existingTask?: Task;
  onSuccess?: () => void;
  initialStatus?: string;
};

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["todo", "in-progress", "done"] as const),
  priority: z.enum(["low", "medium", "high"] as const).optional(),
  dueDate: z.date().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export const TaskForm = ({ boardId, existingTask, onSuccess, initialStatus }: TaskFormProps) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues: Partial<TaskFormValues> = {
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    status: existingTask?.status || initialStatus as TaskStatus || "todo",
    priority: existingTask?.priority || undefined,
    dueDate: existingTask?.dueDate ? new Date(existingTask.dueDate) : undefined,
  };
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });
  
  const onSubmit = async (values: TaskFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (existingTask) {
        // Update existing task
        const updatedTask = await updateTask(existingTask.id, { 
          ...values,
          dueDate: values.dueDate ? values.dueDate.toISOString() : undefined
        });
        
        // Update Recoil state
        setTasks(tasks.map((task) => 
          task.id === existingTask.id ? updatedTask : task
        ));
        
        toast.success("Task updated successfully");
      } else {
        // Create new task
        const newTask = await createTask({
          title: values.title,
          description: values.description,
          status: values.status,
          boardId,
          priority: values.priority,
          dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
        });
        
        // Update Recoil state
        setTasks([...tasks, newTask]);
        
        toast.success("Task created successfully");
      }
      
      onSuccess?.();
    } catch (error: any) {
      console.error("Error saving task:", error);
      toast.error(error.message || "Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
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
                <Textarea placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={(value: TaskStatus) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={(value: TaskPriority) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-center gap-4 mt-2 pt-2 border-t">
          <User size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Assignees feature coming soon</span>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {existingTask ? "Updating..." : "Creating..."}
              </>
            ) : (
              existingTask ? "Update Task" : "Create Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
