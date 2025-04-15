
import { Button } from "@/components/ui/button";
import { Column } from "@/recoil/atoms/columnsAtom";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnHeaderProps {
  column: Column;
  taskCount: number;
  onEdit: (column: Column) => void;
  onAddTask: (status: string) => void;
  onDelete: (columnId: string) => void;
}

export const ColumnHeader = ({ 
  column, 
  taskCount, 
  onEdit, 
  onAddTask, 
  onDelete 
}: ColumnHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className={cn("h-3 w-3 rounded-full", column.color)} />
        <span className="font-bold text-gray-400 tracking-wider text-sm ml-3">
          {column.title}
        </span>
        <span className="ml-2 text-gray-400 text-sm">({taskCount})</span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => onEdit(column)}
            className="cursor-pointer"
          >
            Edit Column
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onAddTask(column.status)}
            className="cursor-pointer"
          >
            Add Task
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(column.id)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            Delete Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
