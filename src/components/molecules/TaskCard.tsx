
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";
import { motion } from "framer-motion";
import { Calendar, CheckSquare, MessageSquare, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  boardId: string;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: string[];
  comments?: number;
  attachments?: number;
  subtasks?: { id: string; title: string; completed: boolean }[];
};

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const setEditModal = useSetRecoilState(editTaskModalState);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModal({
      isOpen: true,
      task,
    });
  };

  // Calculate completed subtasks
  const subtasksCompleted = task.subtasks?.filter(subtask => subtask.completed)?.length || 0;
  const subtasksTotal = task.subtasks?.length || 0;

  // Get priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-slate-400";
    }
  };

  // Format due date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-[#2B2C37] p-5 rounded-lg shadow-md border border-gray-700/50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      {task.priority && (
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-xs">
            {task.priority.toUpperCase()}
          </Badge>
          <div className={cn("h-2 w-2 rounded-full", getPriorityColor())}></div>
        </div>
      )}
      
      <h3 className="font-bold text-white mb-2">{task.title}</h3>
      
      {task.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-col space-y-3 mt-3">
        {subtasksTotal > 0 && (
          <div className="flex items-center text-xs text-gray-400">
            <CheckSquare className="h-3 w-3 mr-1.5" />
            <span>{subtasksCompleted} of {subtasksTotal} subtasks</span>
          </div>
        )}
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>Due {formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700/30">
        {task.assignedTo && task.assignedTo.length > 0 && (
          <div className="flex -space-x-2">
            {task.assignedTo.slice(0, 3).map((user, index) => (
              <div 
                key={index} 
                className="h-6 w-6 rounded-full bg-primary/80 flex items-center justify-center text-xs text-white border border-gray-800"
              >
                {user.charAt(0).toUpperCase()}
              </div>
            ))}
            {task.assignedTo.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border border-gray-800">
                +{task.assignedTo.length - 3}
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-2 text-gray-400">
          {task.comments && task.comments > 0 && (
            <div className="flex items-center text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments && task.attachments > 0 && (
            <div className="flex items-center text-xs">
              <Paperclip className="h-3 w-3 mr-1" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
