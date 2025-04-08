
import { useRecoilValue } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { BoardCard } from "@/components/molecules/BoardCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const BoardList = () => {
  const boards = useRecoilValue(boardsState);
  
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Boards</h2>
        <Button asChild>
          <Link to="/board/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Board
          </Link>
        </Button>
      </div>
      
      {boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <h3 className="text-lg font-medium mb-2">No boards yet</h3>
          <p className="text-slate-500 mb-4">Create your first board to get started</p>
          <Button asChild>
            <Link to="/board/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Board
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
