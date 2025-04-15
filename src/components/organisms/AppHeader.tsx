
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRecoilState } from "recoil";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";

interface AppHeaderProps {
  children?: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  const [createModal, setCreateModal] = useRecoilState(createTaskModalState);
  
  const openCreateTaskModal = () => {
    setCreateModal({
      isOpen: true,
      boardId: window.location.pathname.split('/')[2],
      initialStatus: "todo"
    });
  };
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/30 bg-[#1A1F2C] px-4"
    >
      <div className="flex-1 md:flex-initial flex items-center gap-2">
        {children}
        <Link to="/" className="text-lg font-bold text-white">
          Platform Launch
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          onClick={openCreateTaskModal}
          className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add New Task
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 p-0 rounded-full" aria-label="More options">
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit Board
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
