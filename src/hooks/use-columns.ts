
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { columnsState, Column } from "@/recoil/atoms/columnsAtom";
import { getColumns } from "@/services/columnService";
import { toast } from "sonner";

export const useColumns = (boardId?: string) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColumns = async () => {
      if (!boardId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const columnsData = await getColumns(boardId);
        setColumns(columnsData);
      } catch (error: any) {
        console.error("Error fetching columns:", error);
        setError(error.message || "Failed to load columns");
        toast.error("Failed to load columns");
      } finally {
        setLoading(false);
      }
    };
    
    fetchColumns();
  }, [boardId, setColumns]);

  return { columns, loading, error };
};
