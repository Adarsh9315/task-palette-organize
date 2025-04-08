
import { atom } from "recoil";
import { Task } from "@/components/molecules/TaskCard";

// Sample initial state with some tasks
const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Design Homepage",
    description: "Create mockups for the landing page",
    status: "todo",
    boardId: "b1",
  },
  {
    id: "t2",
    title: "Implement Authentication",
    description: "Set up user login and registration",
    status: "in-progress",
    boardId: "b1",
  },
  {
    id: "t3",
    title: "Write API Documentation",
    description: "Document all API endpoints for the team",
    status: "done",
    boardId: "b1",
  },
  {
    id: "t4",
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits, and other essentials",
    status: "todo",
    boardId: "b2",
  },
  {
    id: "t5",
    title: "Pay Utility Bills",
    description: "Pay electricity and water bills",
    status: "done",
    boardId: "b2",
  },
];

export const tasksState = atom<Task[]>({
  key: "tasksState",
  default: initialTasks,
});
