
import { useState } from "react";
import { useRecoilState } from "recoil";
import { columnsState, Column } from "@/recoil/atoms/columnsAtom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

type ColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  column?: Column;
};

export const ColumnModal = ({ isOpen, onClose, column }: ColumnModalProps) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const [title, setTitle] = useState(column?.title || "");
  const [color, setColor] = useState(column?.color.replace("bg-[", "").replace("]", "") || "#00A3FF");

  const isEditing = !!column;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Column title is required");
      return;
    }
    
    const status = column?.status || title.toLowerCase().replace(/\s+/g, '-');
    
    if (isEditing) {
      // Update existing column
      setColumns(prev => 
        prev.map(col => 
          col.id === column.id 
            ? { 
                ...col, 
                title, 
                color: `bg-[${color}]`, 
                textColor: `text-[${color}]` 
              }
            : col
        )
      );
      toast.success("Column updated successfully");
    } else {
      // Check if status already exists
      const statusExists = columns.some(col => col.status === status);
      
      if (statusExists) {
        toast.error("A column with similar name already exists");
        return;
      }
      
      // Create new column
      const newColumn: Column = {
        id: status,
        title,
        status,
        color: `bg-[${color}]`,
        textColor: `text-[${color}]`
      };
      
      setColumns(prev => [...prev, newColumn]);
      toast.success("Column added successfully");
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (!column) return;
    
    // Check if there are tasks in this column
    // If yes, show warning and don't delete
    
    setColumns(prev => prev.filter(col => col.id !== column.id));
    toast.success("Column deleted successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-[#20212C] border-gray-700"
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
              >
                <XCircle className="h-4 w-4" />
                Delete Column
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Add Column"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
