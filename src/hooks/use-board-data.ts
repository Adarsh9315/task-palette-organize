
import { useState, useEffect } from "react";
import { getBoardById } from "@/services/boardService";
import { getColumns } from "@/services/columnService";
import { getTasks } from "@/services/taskService";
import { useRecoilState } from "recoil";
import { columnsState } from "@/recoil/atoms/columnsAtom";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { toast } from "sonner";

export const useBoardData = (boardId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [board, setBoard] = useState<any>(null);
  const [columns, setColumns] = useRecoilState(columnsState);
  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!boardId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch board data
        const boardData = await getBoardById(boardId);
        if (!boardData) {
          setError("Board not found");
          return;
        }
        setBoard(boardData);
        
        // Fetch columns
        const columnsData = await getColumns(boardId);
        setColumns(columnsData);
        
        // Fetch tasks
        const tasksData = await getTasks(boardId);
        setTasks(tasksData);
        
      } catch (error: any) {
        console.error("Error fetching board data:", error);
        setError(error.message || "Failed to load board data");
        toast.error("Failed to load board data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBoardData();
  }, [boardId, setColumns, setTasks]);

  return { isLoading, error, board, columns, tasks };
};
