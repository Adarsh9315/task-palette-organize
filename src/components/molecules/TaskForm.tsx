
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { Task, TaskStatus } from "@/components/molecules/TaskCard";
import { v4 as uuidv4 } from "@/lib/uuid";

type TaskFormProps = {
  boardId: string;
  existingTask?: Task;
  onSuccess?: () => void;
};

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["todo", "in-progress", "done"]),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export const TaskForm = ({ boardId, existingTask, onSuccess }: TaskFormProps) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  
  const defaultValues: TaskFormValues = {
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    status: existingTask?.status || "todo",
  };
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });
  
  const onSubmit = (values: TaskFormValues) => {
    if (existingTask) {
      // Update existing task
      setTasks(tasks.map((task) => 
        task.id === existingTask.id 
          ? { ...task, ...values } 
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: uuidv4(),
        boardId,
        ...values,
      };
      setTasks([...tasks, newTask]);
    }
    
    if (onSuccess) {
      onSuccess();
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
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
                <Textarea placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        
        <div className="flex justify-end">
          <Button type="submit">
            {existingTask ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
