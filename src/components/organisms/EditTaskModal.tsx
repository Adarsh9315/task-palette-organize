
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "@/components/molecules/TaskForm";
import { useRecoilState } from "recoil";
import { editTaskModalState } from "@/recoil/atoms/modalAtom";

export const EditTaskModal = () => {
  const [modalState, setModalState] = useRecoilState(editTaskModalState);
  
  const handleClose = () => {
    setModalState({
      isOpen: false,
      task: undefined,
    });
  };
  
  if (!modalState.task) {
    return null;
  }
  
  return (
    <Dialog open={modalState.isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm 
          boardId={modalState.task.boardId}
          existingTask={modalState.task}
          onSuccess={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
