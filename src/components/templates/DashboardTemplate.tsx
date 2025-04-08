
import { BoardList } from "@/components/organisms/BoardList";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const DashboardTemplate = () => {
  return (
    <div className="p-4 md:p-6 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-muted-foreground dark:text-gray-400">Manage your boards and tasks</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button asChild className="animate-fade-in">
            <Link to="/board/new">
              <Plus className="mr-2 h-4 w-4" />
              New Board
            </Link>
          </Button>
        </div>
      </motion.div>
      <BoardList />
      <CreateTaskModal />
      <EditTaskModal />
    </div>
  );
};
