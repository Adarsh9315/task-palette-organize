
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Trash2, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useDeleteBoard } from "@/hooks/use-delete-board";

export interface Board {
  id: string;
  title: string;
  description: string;
  theme?: string;
}

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  const { deleteBoard, isDeleting } = useDeleteBoard();
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${board.title}"?`)) {
      await deleteBoard(board.id);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full border-l-4 flex flex-col hover:border-primary transition-colors",
        board.theme === "blue" ? "border-l-blue-500" : "",
        board.theme === "green" ? "border-l-green-500" : "",
        board.theme === "purple" ? "border-l-purple-500" : "",
        board.theme === "red" ? "border-l-red-500" : "",
        (!board.theme || board.theme === "default") ? "border-l-slate-400" : ""
      )}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center font-medium text-lg">
            <LayoutDashboard className="h-4 w-4 mr-2 opacity-70" />
            {board.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {board.description}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between gap-2">
          <Button variant="outline" asChild className="w-full">
            <Link to={`/board/${board.id}`}>
              Open Board
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              asChild
            >
              <Link to={`/board/edit/${board.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit board</span>
              </Link>
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete board</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
