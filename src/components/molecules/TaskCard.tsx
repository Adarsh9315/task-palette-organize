
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-[#2B2C37] p-5 rounded-lg shadow-md border border-gray-700/50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      <h3 className="font-bold text-white mb-2">{task.title}</h3>
      
      {subtasksTotal > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          {subtasksCompleted} of {subtasksTotal} subtasks
        </p>
      )}
    </motion.div>
  );
};
