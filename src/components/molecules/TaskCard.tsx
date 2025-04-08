
import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Pencil, Trash2 } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";
import { Button } from "@/components/ui/button";

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  boardId: string;
};

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const setTasks = useSetRecoilState(tasksState);
  const setEditModal = useSetRecoilState(editTaskModalState);

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleEdit = () => {
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

  return (
    <div
      className="bg-white p-4 rounded-lg task-card-shadow animate-fade-in border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-2 flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        {isHovered && (
          <div className="flex space-x-1">
            <Button
              variant="ghost" 
              size="sm"
              onClick={handleEdit}
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
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      <Badge variant={task.status} label={statusLabel[task.status]} />
    </div>
  );
};
