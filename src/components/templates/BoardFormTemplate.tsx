
import { useParams } from "react-router-dom";
import { AppHeader } from "@/components/organisms/AppHeader";
import { BoardForm } from "@/components/molecules/BoardForm";
import { useRecoilValue } from "recoil";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const BoardFormTemplate = () => {
  const { boardId } = useParams<{ boardId: string }>();
  
  const board = boardId ? useRecoilValue(boardByIdSelector(boardId)) : undefined;
  
  const isEditMode = !!boardId;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-3xl w-full mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link to="/">
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          
          <h1 className="text-2xl font-bold dark:text-white">
            {isEditMode ? "Edit Board" : "Create New Board"}
          </h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Board Details</h2>
          <BoardForm existingBoard={board} />
        </div>
      </main>
    </div>
  );
};
