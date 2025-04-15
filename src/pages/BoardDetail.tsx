
import { BoardTemplate } from "@/components/templates/BoardTemplate";
import { useRecoilValue } from "recoil";
import { useParams, Link } from "react-router-dom";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const board = useRecoilValue(boardByIdSelector(boardId || ""));
  const { setDocumentTitle } = useDocumentTitle();
  const isMobile = useIsMobile();
  
  // Update document title based on current board
  useEffect(() => {
    if (board) {
      setDocumentTitle(board.title);
    } else {
      setDocumentTitle("Board");
    }
  }, [board, setDocumentTitle]);

  return (
    <>
      {/* Mobile-only back button */}
      {isMobile && (
        <div className="px-4 py-2 sticky top-0 z-20 bg-background">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="mb-2 flex items-center"
          >
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              All Boards
            </Link>
          </Button>
        </div>
      )}
      <BoardTemplate />
    </>
  );
};

export default BoardDetail;
