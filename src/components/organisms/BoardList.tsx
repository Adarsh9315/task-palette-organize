
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { BoardCard } from "@/components/molecules/BoardCard";
import { PlusCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getBoards } from "@/services/boardService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader } from "@/components/atoms/Loader";

export const BoardList = () => {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getBoards();
        setBoards(data);
      } catch (error: any) {
        console.error("Error fetching boards:", error);
        setError(error.message || "Failed to fetch boards");
        toast.error("Failed to load boards");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchBoards();
    }
  }, [user, setBoards]);
  
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6 flex justify-between items-center"
      >
        <h2 className="text-xl font-semibold dark:text-white">My Boards</h2>
        <Button asChild variant="outline" className="dark:border-gray-700 dark:bg-gray-800">
          <Link to="/board/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Board
          </Link>
        </Button>
      </motion.div>
      
      {boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200 dark:bg-gray-800/50 dark:border-gray-700"
        >
          <h3 className="text-lg font-medium mb-2 dark:text-white">No boards yet</h3>
          <p className="text-slate-500 mb-4 dark:text-gray-400">Create your first board to get started</p>
          <Button asChild>
            <Link to="/board/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Board
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
};
