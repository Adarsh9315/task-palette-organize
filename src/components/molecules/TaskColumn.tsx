
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Column } from "@/recoil/atoms/columnsAtom";
import { Task } from "@/types/task";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskCard } from "@/components/molecules/TaskCard";
import { ColumnHeader } from "./ColumnHeader";

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  index: number;
  onEditColumn: (column: Column) => void;
  onAddTask: (status: string) => void;
  onDeleteColumn: (columnId: string) => void;
}

export const TaskColumn = ({ 
  column, 
  tasks, 
  index, 
  onEditColumn, 
  onAddTask, 
  onDeleteColumn 
}: TaskColumnProps) => {
  return (
    <motion.div 
      key={column.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="task-column"
    >
      <ColumnHeader 
        column={column} 
        taskCount={tasks.length}
        onEdit={onEditColumn}
        onAddTask={onAddTask}
        onDelete={onDeleteColumn}
      />
          
      <Droppable droppableId={column.status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 min-h-[200px] transition-colors duration-200 rounded-lg p-2",
              snapshot.isDraggingOver ? 'bg-muted/20' : ''
            )}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '20px',
                      }}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="rounded-md p-4 text-sm text-muted-foreground border border-dashed border-border h-24 flex items-center justify-center">
                No tasks in this column
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <Button
        onClick={() => onAddTask(column.status)}
        variant="outline"
        className="mt-3 w-full border-dashed border-border bg-transparent hover:bg-muted/20 text-muted-foreground"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </motion.div>
  );
};
