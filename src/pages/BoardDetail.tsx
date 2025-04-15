
import { BoardTemplate } from "@/components/templates/BoardTemplate";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const board = useRecoilValue(boardByIdSelector(boardId || ""));
  const { setDocumentTitle } = useDocumentTitle();
  
  // Update document title based on current board
  useEffect(() => {
    if (board) {
      setDocumentTitle(board.title);
    } else {
      setDocumentTitle("Board");
    }
  }, [board, setDocumentTitle]);

  return <BoardTemplate />;
};

export default BoardDetail;
