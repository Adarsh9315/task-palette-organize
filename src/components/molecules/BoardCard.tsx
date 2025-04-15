
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { ArrowRight, Edit, Trash2, Loader } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { deleteBoard } from "@/services/boardService";

export type BoardColumn = {
  id: string;
  title: string;
  order: number;
};

export type Board = {
  id: string;
  title: string;
  description: string;
  theme?: string;
  columns?: BoardColumn[];
};

type BoardCardProps = {
  board: Board;
};

export const BoardCard = ({ board }: BoardCardProps) => {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBoard(board.id);
      
      // Update Recoil state
      setBoards(boards.filter(b => b.id !== board.id));
      toast.success("Board deleted successfully");
    } catch (error: any) {
      console.error("Error deleting board:", error);
      toast.error(error.message || "Failed to delete board");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Get theme-based classes
  const getThemeClasses = () => {
    switch(board.theme) {
      case "blue":
        return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30";
      case "green":
        return "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30";
      case "purple":
        return "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-800/30";
      case "amber":
        return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-800/30";
      case "rose":
        return "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 dark:border-rose-800/30";
      default:
        return "bg-white dark:bg-gray-800/80";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={cn("h-full border transition-all shadow-sm hover:shadow-md", getThemeClasses())}>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold dark:text-white">{board.title}</h3>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm dark:text-gray-300">
            {board.description.length > 100 
              ? `${board.description.substring(0, 100)}...` 
              : board.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3 dark:border-gray-700">
          <div className="flex space-x-2">
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Board</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{board.title}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
              <Link to={`/board/edit/${board.id}`}>
                <Edit size={16} className="text-blue-500" />
              </Link>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 group" asChild>
            <Link to={`/board/${board.id}`}>
              View Board
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
