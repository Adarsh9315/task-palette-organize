
import { atom } from "recoil";

export type Column = {
  id: string;
  title: string;
  status: string;
  color: string;
  textColor: string;
};

// Default columns
const initialColumns: Column[] = [
  { id: "todo", title: "TODO", status: "todo", color: "bg-[#00A3FF]", textColor: "text-[#00A3FF]" },
  { id: "in-progress", title: "DOING", status: "in-progress", color: "bg-primary", textColor: "text-primary" },
  { id: "done", title: "DONE", status: "done", color: "bg-[#00CA92]", textColor: "text-[#00CA92]" }
];

export const columnsState = atom<Column[]>({
  key: "columnsState",
  default: initialColumns,
});
