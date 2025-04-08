
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pencil, Trash2, Users, LogIn } from "lucide-react";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export type Column = {
  id: string;
  title: string;
  order: number;
};

export type Board = {
  id: string;
  title: string;
  description: string;
  theme?: string;
  columns?: Column[];
};

type BoardCardProps = {
  board: Board;
};

export const BoardCard = ({ board }: BoardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const setBoards = useSetRecoilState(boardsState);
  const setTasks = useSetRecoilState(tasksState);
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBoards((prev) => prev.filter((b) => b.id !== board.id));
    // Also delete all tasks associated with this board
    setTasks((prev) => prev.filter((task) => task.boardId !== board.id));
  };

  const handleClick = () => {
    navigate(`/board/${board.id}`);
  };

  // Map theme to tailwind class
  const getThemeClass = () => {
    switch (board.theme) {
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'purple':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Card className={`cursor-pointer h-full ${getThemeClass()} transition-all duration-300`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-start">
            {board.title}
            {isHovered && (
              <div className="flex space-x-1">
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/board/edit/${board.id}`);
                  }}
                  className="h-7 w-7 p-0 rounded-full"
                >
                  <Pencil size={14} />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={handleDelete}
                  className="h-7 w-7 p-0 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={14} />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            )}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {board.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm pb-2">
          <p className="text-muted-foreground mb-2">
            {board.columns?.length || 3} columns
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              // This would open user management in the future
            }}
          >
            <Users size={14} className="mr-1" />
            Share
          </Button>
          <Button 
            size="sm" 
            className="text-xs"
            onClick={handleClick}
          >
            <LogIn size={14} className="mr-1" />
            Open
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
