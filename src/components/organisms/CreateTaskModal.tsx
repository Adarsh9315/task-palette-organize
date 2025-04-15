
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "@/components/molecules/TaskForm";
import { useRecoilState } from "recoil";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";

export const CreateTaskModal = () => {
  const [modalState, setModalState] = useRecoilState(createTaskModalState);
  
  const handleClose = () => {
    setModalState({
      isOpen: false,
      boardId: "",
      initialStatus: undefined,
    });
  };
  
  return (
    <Dialog open={modalState.isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="sm:max-w-[500px] bg-[#2B2C37] text-white">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm 
          boardId={modalState.boardId}
          initialStatus={modalState.initialStatus}
          onSuccess={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
