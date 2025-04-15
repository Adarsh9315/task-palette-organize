
import { useEffect, useCallback } from "react";

export function useDocumentTitle() {
  const setDocumentTitle = useCallback((title: string) => {
    document.title = `${title} | Kanban`;
  }, []);

  return { setDocumentTitle };
}
