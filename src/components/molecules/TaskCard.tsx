
import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Pencil, Trash2, MessageCircle, Paperclip, Clock, User } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";

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
};

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const setTasks = useSetRecoilState(tasksState);
  const setEditModal = useSetRecoilState(editTaskModalState);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModal({
      isOpen: true,
      task,
    });
  };

  const statusLabel = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };
  
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-white p-4 rounded-lg task-card-shadow animate-fade-in border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      <div className="mb-2 flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        {isHovered && (
          <div className="flex space-x-1">
            <Button
              variant="ghost" 
              size="sm"
              onClick={handleEdit}
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
      </div>
      
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={task.status} label={statusLabel[task.status]} />
        
        {task.priority && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              <span>{format(new Date(task.dueDate), "MMM d")}</span>
            </div>
          )}
          
          {task.comments && task.comments > 0 && (
            <div className="flex items-center">
              <MessageCircle size={12} className="mr-1" />
              <span>{task.comments}</span>
            </div>
          )}
          
          {task.attachments && task.attachments > 0 && (
            <div className="flex items-center">
              <Paperclip size={12} className="mr-1" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
        
        {task.assignedTo && task.assignedTo.length > 0 && (
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            <span>{task.assignedTo.length}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
