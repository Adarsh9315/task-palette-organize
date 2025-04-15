
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
    priority: "high",
    dueDate: "2025-05-15",
    assignedTo: ["John D", "Sarah M"],
    subtasks: [
      { id: "st1", title: "Create wireframes", completed: true },
      { id: "st2", title: "Design visual elements", completed: false },
    ],
    comments: 3,
    attachments: 2,
  },
  {
    id: "t2",
    title: "Implement Authentication",
    description: "Set up user login and registration",
    status: "in-progress",
    boardId: "b1",
    priority: "medium",
    dueDate: "2025-05-20",
    assignedTo: ["Mike L"],
    subtasks: [
      { id: "st3", title: "Create login form", completed: true },
      { id: "st4", title: "Set up backend auth", completed: true },
      { id: "st5", title: "Test auth flow", completed: false },
    ],
  },
  {
    id: "t3",
    title: "Write API Documentation",
    description: "Document all API endpoints for the team",
    status: "done",
    boardId: "b1",
    priority: "low",
    assignedTo: ["Alex K", "Emma R", "David S", "Linda M"],
    subtasks: [
      { id: "st6", title: "Document auth endpoints", completed: true },
      { id: "st7", title: "Document user endpoints", completed: true },
    ],
    attachments: 1,
  },
  {
    id: "t4",
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits, and other essentials",
    status: "todo",
    boardId: "b2",
    priority: "medium",
    dueDate: "2025-04-18",
  },
  {
    id: "t5",
    title: "Pay Utility Bills",
    description: "Pay electricity and water bills",
    status: "done",
    boardId: "b2",
    priority: "high",
    comments: 1,
  },
];

export const tasksState = atom<Task[]>({
  key: "tasksState",
  default: initialTasks,
});
