
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { Board } from "@/components/molecules/BoardCard";
import { v4 as uuidv4 } from "@/lib/uuid";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { toast } from "sonner";

type BoardFormProps = {
  existingBoard?: Board;
};

const boardFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  theme: z.string().default("default"),
});

type BoardFormValues = z.infer<typeof boardFormSchema>;

const boardThemes = [
  { value: "default", label: "Default", bgClass: "bg-slate-100 border border-slate-200" },
  { value: "blue", label: "Blue", bgClass: "bg-blue-100 border border-blue-200" },
  { value: "green", label: "Green", bgClass: "bg-green-100 border border-green-200" },
  { value: "purple", label: "Purple", bgClass: "bg-purple-100 border border-purple-200" },
  { value: "amber", label: "Amber", bgClass: "bg-amber-100 border border-amber-200" },
  { value: "rose", label: "Rose", bgClass: "bg-rose-100 border border-rose-200" },
];

export const BoardForm = ({ existingBoard }: BoardFormProps) => {
  const [boards, setBoards] = useRecoilState(boardsState);
  const navigate = useNavigate();
  
  const defaultValues: BoardFormValues = {
    title: existingBoard?.title || "",
    description: existingBoard?.description || "",
    theme: existingBoard?.theme || "default",
  };
  
  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
    defaultValues,
  });
  
  const onSubmit = (values: BoardFormValues) => {
    if (existingBoard) {
      // Update existing board
      setBoards(boards.map((board) => 
        board.id === existingBoard.id 
          ? { ...board, ...values } 
          : board
      ));
      toast.success("Board updated successfully!");
    } else {
      // Create new board - ensure title and description are provided
      const newBoard: Board = {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        theme: values.theme,
        columns: [
          { id: uuidv4(), title: "To Do", order: 0 },
          { id: uuidv4(), title: "In Progress", order: 1 },
          { id: uuidv4(), title: "Done", order: 2 }
        ]
      };
      setBoards([...boards, newBoard]);
      toast.success("Board created successfully!");
    }
    
    navigate("/");
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base dark:text-white">Board Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter board title" 
                    className="text-base dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                    {...field} 
                  />
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
                <FormLabel className="text-base dark:text-white">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter board description" 
                    className="min-h-[100px] text-base dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base dark:text-white">Board Theme</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    {boardThemes.map(theme => (
                      <FormItem key={theme.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={theme.value} />
                        </FormControl>
                        <div className={`w-10 h-10 rounded ${theme.bgClass} dark:opacity-80`}></div>
                        <FormLabel className="font-normal dark:text-white">{theme.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-end space-x-2"
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/")}
            className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="animate-pulse-once bg-primary hover:bg-primary/90"
          >
            {existingBoard ? "Update Board" : "Create Board"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
