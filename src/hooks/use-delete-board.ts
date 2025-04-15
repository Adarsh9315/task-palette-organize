
import { useState } from "react";
import { useRecoilState } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { toast } from "sonner";
import { deleteBoard as deleteBoardService } from "@/services/boardService";

export const useDeleteBoard = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [boards, setBoards] = useRecoilState(boardsState);

  const deleteBoard = async (boardId: string) => {
    try {
      setIsDeleting(true);
      
      // Delete from Supabase using the service
      await deleteBoardService(boardId);
      
      // Update local state
      setBoards(boards.filter((board) => board.id !== boardId));
      
      toast.success("Board deleted successfully");
    } catch (error: any) {
      console.error("Error deleting board:", error);
      toast.error(error.message || "Failed to delete board");
    } finally {
      setIsDeleting(false);
    }
  };
  
  return { deleteBoard, isDeleting };
};
