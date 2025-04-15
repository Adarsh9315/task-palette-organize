
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddColumnButtonProps {
  onClick: () => void;
}

export const AddColumnButton = ({ onClick }: AddColumnButtonProps) => {
  return (
    <div className="flex items-center justify-center min-w-[280px] h-[100px] mt-16">
      <Button 
        onClick={onClick}
        variant="outline" 
        className="border-dashed border-border hover:border-primary bg-transparent hover:bg-muted/20 px-8 py-6"
      >
        <Plus className="h-5 w-5 mr-2 text-primary" />
        Add New Column
      </Button>
    </div>
  );
};
