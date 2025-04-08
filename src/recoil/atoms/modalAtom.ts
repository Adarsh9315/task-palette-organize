
import { atom } from "recoil";
import { Task } from "@/components/molecules/TaskCard";

export const createTaskModalState = atom({
  key: "createTaskModalState",
  default: {
    isOpen: false,
    boardId: "",
  },
});

export const editTaskModalState = atom({
  key: "editTaskModalState",
  default: {
    isOpen: false,
    task: undefined as Task | undefined,
  },
});
