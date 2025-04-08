
import { selectorFamily } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { Task } from "@/components/molecules/TaskCard";

export const filteredTasksSelector = selectorFamily<Task[], string>({
  key: "filteredTasksSelector",
  get: (boardId: string) => ({ get }) => {
    const tasks = get(tasksState);
    return tasks.filter(task => task.boardId === boardId);
  },
});

export const tasksByStatusSelector = selectorFamily<Task[], { boardId: string; status: string }>({
  key: "tasksByStatusSelector",
  get: (param) => ({ get }) => {
    const { boardId, status } = param;
    const tasks = get(tasksState);
    return tasks.filter(task => task.boardId === boardId && task.status === status);
  },
});
