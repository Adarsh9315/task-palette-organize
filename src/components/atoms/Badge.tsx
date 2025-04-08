
import { cn } from "@/lib/utils";

type BadgeProps = {
  label: string;
  variant?: "todo" | "in-progress" | "done" | "default";
  className?: string;
};

const badgeVariants = {
  todo: "bg-task-todo text-blue-700 border-blue-200",
  "in-progress": "bg-task-in-progress text-amber-700 border-amber-200",
  done: "bg-task-done text-green-700 border-green-200",
  default: "bg-secondary text-secondary-foreground",
};

export const Badge = ({ label, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
