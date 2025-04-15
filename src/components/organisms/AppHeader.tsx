
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRecoilState, useRecoilValue } from "recoil";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";
import { toast } from "sonner";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppHeaderProps {
  children?: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const [createModal, setCreateModal] = useRecoilState(createTaskModalState);
  const currentBoard = useRecoilValue(boardByIdSelector(boardId || ""));
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isCreateBoardPage = location.pathname.includes('/board/new');
  const isEditBoardPage = location.pathname.includes('/board/edit');
  
  const openCreateTaskModal = () => {
    if (!boardId || boardId === 'new' || boardId === 'edit') {
      toast.error("Please select a board first");
      return;
    }
    
    setCreateModal({
      isOpen: true,
      boardId: boardId,
      initialStatus: "todo"
    });
  };

  const handleNewBoard = () => {
    navigate('/board/new');
  };
  
  const handleEditBoard = () => {
    if (boardId) {
      navigate(`/board/edit/${boardId}`);
    } else {
      toast.error("Please select a board first");
    }
  };
  
  const isInBoardDetail = boardId && boardId !== 'new' && boardId !== 'edit';
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full flex h-16 items-center justify-between border-b border-border/30 px-2 sm:px-4",
        "dark:bg-[#1A1F2C] bg-white"
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        {children}
        
        <h1 className="text-lg font-bold truncate">
          {currentBoard?.title || "Platform Launch"}
        </h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {isInBoardDetail && (
          <Button 
            onClick={openCreateTaskModal}
            className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full text-xs sm:text-sm"
            size={isMobile ? "sm" : "default"}
          >
            <Plus className="h-4 w-4 mr-0.5 sm:mr-1" />
            {isMobile ? "New" : "Add New Task"}
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 p-0 rounded-full" aria-label="More options">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNewBoard} className="cursor-pointer">
              Create New Board
            </DropdownMenuItem>
            {boardId && boardId !== 'new' && boardId !== 'edit' && (
              <>
                <DropdownMenuItem onClick={handleEditBoard} className="cursor-pointer">
                  Edit Current Board
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => {
                    // This would typically show a confirmation dialog
                    toast.error("Delete functionality not implemented");
                  }}
                >
                  Delete Board
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeSwitcher />
      </div>
    </motion.header>
  );
};

