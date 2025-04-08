
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { useNavigate } from "react-router-dom";

export type Board = {
  id: string;
  title: string;
  description: string;
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

  return (
    <div
      className="bg-white p-5 rounded-lg board-card-shadow animate-slide-in border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="mb-3 flex justify-between items-start">
        <h3 className="font-medium text-gray-900 text-lg">{board.title}</h3>
        {isHovered && (
          <div className="flex space-x-1">
            <Button
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/board/edit/${board.id}`);
              }}
              className="h-7 w-7 p-0"
            >
              <Pencil size={14} />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={handleDelete}
              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={14} />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">{board.description}</p>
    </div>
  );
};
