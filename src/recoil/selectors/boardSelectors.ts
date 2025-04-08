
import { selector, selectorFamily } from "recoil";
import { boardsState } from "@/recoil/atoms/boardsAtom";
import { Board } from "@/components/molecules/BoardCard";

export const boardByIdSelector = selectorFamily<Board | undefined, string>({
  key: "boardByIdSelector",
  get: (boardId: string) => ({ get }) => {
    const boards = get(boardsState);
    return boards.find(board => board.id === boardId);
  },
});

export const boardCountSelector = selector<number>({
  key: "boardCountSelector",
  get: ({ get }) => {
    const boards = get(boardsState);
    return boards.length;
  },
});
