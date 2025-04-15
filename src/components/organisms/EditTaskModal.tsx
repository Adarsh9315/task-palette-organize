
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "@/components/molecules/TaskForm";
import { useRecoilState } from "recoil";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTaskOperations } from "@/hooks/use-task-operations";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export const EditTaskModal = () => {
  const [modalState, setModalState] = useRecoilState(editTaskModalState);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteTask } = useTaskOperations(modalState.task?.boardId);
  
  const handleClose = () => {
    setModalState({
      isOpen: false,
      task: undefined,
    });
  };
  
  const handleDelete = async () => {
    if (modalState.task) {
      await deleteTask(modalState.task.id);
      handleClose();
    }
  };
  
  if (!modalState.task) {
    return null;
  }
  
  return (
    <>
      <Dialog open={modalState.isOpen} onOpenChange={(open) => {
        if (!open) handleClose();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <div className="absolute right-8 top-6">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </DialogHeader>
          <TaskForm 
            boardId={modalState.task.boardId}
            existingTask={modalState.task}
            onSuccess={handleClose}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task "{modalState.task.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
