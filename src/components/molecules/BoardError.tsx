
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BoardErrorProps {
  error: string | null;
}

export const BoardError = ({ error }: BoardErrorProps) => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "Board not found"}</AlertDescription>
      </Alert>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};
