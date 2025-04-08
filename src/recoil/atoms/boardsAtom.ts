
import { atom } from "recoil";
import { Board } from "@/components/molecules/BoardCard";

// Sample initial state with some boards
const initialBoards: Board[] = [
  {
    id: "b1",
    title: "Project Alpha",
    description: "Main project management board for Project Alpha",
  },
  {
    id: "b2",
    title: "Personal Tasks",
    description: "Personal tasks and reminders",
  },
];

export const boardsState = atom<Board[]>({
  key: "boardsState",
  default: initialBoards,
});
