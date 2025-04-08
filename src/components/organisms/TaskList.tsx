
import { useRecoilValue } from "recoil";
import { filteredTasksSelector } from "@/recoil/selectors/taskSelectors";
import { TaskCard } from "@/components/molecules/TaskCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";

type TaskListProps = {
  boardId: string;
};

export const TaskList = ({ boardId }: TaskListProps) => {
  const tasks = useRecoilValue(filteredTasksSelector(boardId));
  const setCreateModal = useSetRecoilState(createTaskModalState);
  
  const openCreateTaskModal = () => {
    setCreateModal({
      isOpen: true,
      boardId,
    });
  };

  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const doneTasks = tasks.filter(task => task.status === "done");
  
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={openCreateTaskModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-task-todo px-4 py-2 rounded-md font-medium text-sm text-blue-700">
            To Do ({todoTasks.length})
          </div>
          {todoTasks.length > 0 ? (
            todoTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="bg-slate-50 rounded-md p-4 text-sm text-slate-500 text-center border border-dashed border-slate-200">
              No tasks to do yet
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-task-in-progress px-4 py-2 rounded-md font-medium text-sm text-amber-700">
            In Progress ({inProgressTasks.length})
          </div>
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="bg-slate-50 rounded-md p-4 text-sm text-slate-500 text-center border border-dashed border-slate-200">
              No tasks in progress
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-task-done px-4 py-2 rounded-md font-medium text-sm text-green-700">
            Done ({doneTasks.length})
          </div>
          {doneTasks.length > 0 ? (
            doneTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="bg-slate-50 rounded-md p-4 text-sm text-slate-500 text-center border border-dashed border-slate-200">
              No completed tasks yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
