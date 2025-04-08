
import { atom } from "recoil";
import { Task } from "@/components/molecules/TaskCard";

// Modal for creating tasks
export const createTaskModalState = atom({
  key: "createTaskModalState",
  default: {
    isOpen: false,
    boardId: "",
    initialStatus: undefined as string | undefined,
  },
});

// Modal for editing tasks
export const editTaskModalState = atom({
  key: "editTaskModalState",
  default: {
    isOpen: false,
    task: undefined as Task | undefined,
  },
});
