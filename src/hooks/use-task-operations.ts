
import { useRecoilState } from "recoil";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { columnsState } from "@/recoil/atoms/columnsAtom";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";
import { updateTask } from "@/services/taskService";
import { useState } from "react";
import { toast } from "sonner";
import { DropResult } from "react-beautiful-dnd";
import { TaskStatus } from "@/types/task";

export const useTaskOperations = (boardId: string | undefined) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [columns, setColumns] = useRecoilState(columnsState);
  const [createModal, setCreateModal] = useRecoilState(createTaskModalState);
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<any>(undefined);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped in the same place, do nothing
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find the task that was dragged
    const taskId = draggableId;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Find the corresponding column to get the correct status type
    const targetColumn = columns.find(col => col.status === destination.droppableId);
    if (!targetColumn) return;
    
    try {
      // Update the task's status in Supabase
      await updateTask(taskId, { 
        status: targetColumn.status as TaskStatus 
      });
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              status: targetColumn.status as TaskStatus
            };
          }
          return task;
        })
      );
      
      toast.success("Task moved successfully");
    } catch (error: any) {
      console.error("Error updating task status:", error);
      toast.error(error.message || "Failed to update task status");
    }
  };
  
  const openCreateTaskModal = (status: string) => {
    setCreateModal({
      isOpen: true,
      boardId,
      initialStatus: status
    });
  };
  
  const openAddColumnModal = () => {
    setSelectedColumn(undefined);
    setColumnModalOpen(true);
  };
  
  const openEditColumnModal = (column: any) => {
    setSelectedColumn(column);
    setColumnModalOpen(true);
  };
  
  const deleteColumn = async (columnId: string) => {
    // First ensure we have more than one column left
    if (columns.length <= 1) {
      toast.error("Cannot delete the only column");
      return;
    }
    
    try {
      // Move tasks from this column to the first column
      const firstColumn = columns.find(c => c.id !== columnId);
      const columnToDelete = columns.find(c => c.id === columnId);
      
      if (!columnToDelete) return;
      
      const tasksMigrated = tasks.filter(task => task.status === columnToDelete.status);
      
      if (tasksMigrated.length > 0 && firstColumn) {
        // Update all tasks in this column to the first column's status
        for (const task of tasksMigrated) {
          await updateTask(task.id, { status: firstColumn.status as TaskStatus });
        }
        
        // Update local state
        setTasks(prevTasks => 
          prevTasks.map(task => {
            if (task.status === columnToDelete.status) {
              return {
                ...task,
                status: firstColumn.status as TaskStatus
              };
            }
            return task;
          })
        );
      }
      
      // Delete the column
      // TODO: Implement API call to delete column
      setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
      
      toast.success("Column deleted successfully");
    } catch (error: any) {
      console.error("Error deleting column:", error);
      toast.error(error.message || "Failed to delete column");
    }
  };
  
  // Get number of tasks per status
  const getTaskCountByStatus = (status: string) => {
    return tasks.filter(task => task.status === status).length;
  };

  return {
    handleDragEnd,
    openCreateTaskModal,
    openAddColumnModal,
    openEditColumnModal,
    deleteColumn,
    getTaskCountByStatus,
    columnModalOpen,
    setColumnModalOpen,
    selectedColumn
  };
};
