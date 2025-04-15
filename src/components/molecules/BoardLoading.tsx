
import { Loader } from "lucide-react";

export const BoardLoading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
