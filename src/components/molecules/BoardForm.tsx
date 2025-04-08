
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

type BoardFormProps = {
  existingBoard?: Board;
};

const boardFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  theme: z.string().default("default"),
});

type BoardFormValues = z.infer<typeof boardFormSchema>;

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
    }
    
    navigate("/");
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter board title" {...field} />
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
                <Textarea placeholder="Enter board description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Theme</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="default" />
                    </FormControl>
                    <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200"></div>
                    <FormLabel className="font-normal">Default</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="blue" />
                    </FormControl>
                    <div className="w-10 h-10 rounded bg-blue-100 border border-blue-200"></div>
                    <FormLabel className="font-normal">Blue</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="green" />
                    </FormControl>
                    <div className="w-10 h-10 rounded bg-green-100 border border-green-200"></div>
                    <FormLabel className="font-normal">Green</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="purple" />
                    </FormControl>
                    <div className="w-10 h-10 rounded bg-purple-100 border border-purple-200"></div>
                    <FormLabel className="font-normal">Purple</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" className="animate-pulse-once">
            {existingBoard ? "Update Board" : "Create Board"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
