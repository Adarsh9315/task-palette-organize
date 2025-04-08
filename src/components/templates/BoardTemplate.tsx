
import { useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/organisms/AppHeader";
import { TaskList } from "@/components/organisms/TaskList";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";
import { useRecoilValue } from "recoil";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export const BoardTemplate = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  
  const board = useRecoilValue(boardByIdSelector(boardId || ""));
  
  if (!board || !boardId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Board not found</h2>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/")}>
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{board.title}</h1>
              <p className="text-slate-500">{board.description}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/board/edit/${boardId}`}>
                <Pencil size={14} className="mr-2" />
                Edit Board
              </Link>
            </Button>
          </div>
        </div>
        
        <TaskList boardId={boardId} />
        <CreateTaskModal />
        <EditTaskModal />
      </main>
    </div>
  );
};
