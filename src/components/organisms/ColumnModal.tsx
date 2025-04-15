
import { useState } from "react";
import { useRecoilState } from "recoil";
import { columnsState, Column } from "@/recoil/atoms/columnsAtom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle, Loader } from "lucide-react";
import { toast } from "sonner";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { updateTask } from "@/services/taskService";
import { createColumn, updateColumn, deleteColumn as deleteColumnService } from "@/services/columnService";
import { useParams } from "react-router-dom";

type ColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  column?: Column;
};

export const ColumnModal = ({ isOpen, onClose, column }: ColumnModalProps) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [columns, setColumns] = useRecoilState(columnsState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [title, setTitle] = useState(column?.title || "");
  const [color, setColor] = useState(column?.color.replace("bg-[", "").replace("]", "") || "#00A3FF");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!column;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Column title is required");
      return;
    }
    
    if (!boardId) {
      toast.error("No board selected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const status = column?.status || title.toLowerCase().replace(/\s+/g, '-');
      
      if (isEditing) {
        // Update existing column in Supabase
        const updatedColumn = await updateColumn(column.id, { 
          title, 
          color: `bg-[${color}]`, 
          status,
        });
        
        // Update local state
        setColumns(prev => 
          prev.map(col => 
            col.id === column.id ? updatedColumn : col
          )
        );
        toast.success("Column updated successfully");
      } else {
        // Check if status already exists
        const statusExists = columns.some(col => col.status === status);
        
        if (statusExists) {
          toast.error("A column with similar name already exists");
          setIsLoading(false);
          return;
        }
        
        // Create new column in Supabase
        const columnOrder = columns.length;
        const newColumn = await createColumn({
          title,
          status,
          color: `bg-[${color}]`,
          textColor: `text-[${color}]`,
          columnOrder
        }, boardId);
        
        // Update local state
        setColumns(prev => [...prev, newColumn]);
        toast.success("Column added successfully");
      }
    } catch (error: any) {
      console.error("Error saving column:", error);
      toast.error(error.message || "Failed to save column");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  
  const handleDelete = async () => {
    if (!column) return;
    
    // Check if there are tasks in this column
    const tasksInColumn = tasks.filter(task => task.status === column.status);
    
    if (tasksInColumn.length > 0 && !deleteConfirm) {
      setDeleteConfirm(true);
      toast.warning(`This column contains ${tasksInColumn.length} tasks. Delete will move them to the first column.`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // If confirmed, move tasks to first available column or delete them
      if (tasksInColumn.length > 0) {
        const firstColumn = columns.find(col => col.id !== column.id);
        
        if (firstColumn) {
          // Move tasks to first column in Supabase
          for (const task of tasksInColumn) {
            await updateTask(task.id, { status: firstColumn.status as "todo" | "in-progress" | "done" });
          }
          
          // Update local state
          setTasks(prev => 
            prev.map(task => 
              task.status === column.status 
                ? { ...task, status: firstColumn.status as "todo" | "in-progress" | "done" }
                : task
            )
          );
        }
      }
      
      // Delete the column in Supabase
      await deleteColumnService(column.id);
      
      // Update local state
      setColumns(prev => prev.filter(col => col.id !== column.id));
      toast.success("Column deleted successfully");
    } catch (error: any) {
      console.error("Error deleting column:", error);
      toast.error(error.message || "Failed to delete column");
    } finally {
      setIsLoading(false);
      setDeleteConfirm(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setDeleteConfirm(false);
      }
    }}>
      <DialogContent className="sm:max-w-[425px] bg-[#2B2C37] text-white">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Column" : "Add New Column"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {isEditing 
              ? "Update the column details below." 
              : "Add a new column to organize tasks."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Column Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. To Do, In Progress"
              className="bg-[#20212C] border-gray-700"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Column Color</Label>
            <div className="flex gap-3">
              <Input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 p-1 bg-[#20212C] border-gray-700"
                disabled={isLoading}
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-[#20212C] border-gray-700"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between pt-4">
            {isEditing && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete}
                className="flex items-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {deleteConfirm ? "Confirm Delete" : "Delete Column"}
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isEditing ? "Save Changes" : "Add Column"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
