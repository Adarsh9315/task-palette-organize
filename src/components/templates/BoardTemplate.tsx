
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Settings, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { TaskCard } from "@/components/molecules/TaskCard";
import { useState } from "react";
import { filteredTasksSelector } from "@/recoil/selectors/taskSelectors";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";
import { ColumnModal } from "@/components/organisms/ColumnModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { columnsState, Column } from "@/recoil/atoms/columnsAtom";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskStatus } from "@/components/molecules/TaskCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const BoardTemplate = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useRecoilState(tasksState);
  const board = useRecoilValue(boardByIdSelector(boardId || ""));
  const boardTasks = useRecoilValue(filteredTasksSelector(boardId || ""));
  const [createModal, setCreateModal] = useRecoilState(createTaskModalState);
  const [columns, setColumns] = useRecoilState(columnsState);
  const isMobile = useIsMobile();
  
  // Column modal state
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>(undefined);
  
  if (!board || !boardId) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Board not found</h2>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped in the same place, do nothing
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find the task that was dragged
    const taskId = draggableId;
    
    // Find the corresponding column to get the correct status type
    const targetColumn = columns.find(col => col.status === destination.droppableId);
    if (!targetColumn) return;
    
    // Update the task's status based on the destination droppableId
    // We need to ensure the status is properly typed as TaskStatus
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Ensure we're casting the status to TaskStatus
          const newStatus = targetColumn.status as TaskStatus;
          return {
            ...task,
            status: newStatus
          };
        }
        return task;
      })
    );
    
    toast.success("Task moved successfully");
  };
  
  const openCreateTaskModal = (status: string) => {
    setCreateModal({
      isOpen: true,
      boardId,
      initialStatus: status
    });
  };
  
  const openAddColumnModal = () => {
    setSelectedColumn(undefined);
    setColumnModalOpen(true);
  };
  
  const openEditColumnModal = (column: Column) => {
    setSelectedColumn(column);
    setColumnModalOpen(true);
  };
  
  const deleteColumn = (columnId: string) => {
    // First ensure we have more than one column left
    if (columns.length <= 1) {
      toast.error("Cannot delete the only column");
      return;
    }
    
    // Move tasks from this column to the first column
    const firstColumn = columns.find(c => c.id !== columnId);
    const tasksMigrated = tasks.filter(task => task.status === columns.find(c => c.id === columnId)?.status);
    if (tasksMigrated.length > 0 && firstColumn) {
      setTasks(prevTasks => 
        prevTasks.map(task => {
          if (task.status === columns.find(c => c.id === columnId)?.status) {
            // Cast the status to TaskStatus to ensure type safety
            const newStatus = firstColumn.status as TaskStatus;
            return {
              ...task,
              status: newStatus
            };
          }
          return task;
        })
      );
    }
    
    // Delete the column
    setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
    toast.success("Column deleted successfully");
  };
  
  // Get number of tasks per status
  const getTaskCountByStatus = (status: string) => {
    return boardTasks.filter(task => task.status === status).length;
  };
  
  return (
    <div className="h-full flex flex-col bg-background w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 w-full overflow-hidden">
          <ScrollArea className="w-full h-full">
            <div className="flex p-4 gap-6 min-h-[calc(100vh-64px)] overflow-x-auto pb-20">
              {columns.map((column, idx) => {
                const columnTasks = boardTasks.filter(task => task.status === column.status);
                const taskCount = getTaskCountByStatus(column.status);
                
                return (
                  <motion.div 
                    key={column.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex flex-col min-w-[300px] max-w-[300px] h-fit"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={cn("h-3 w-3 rounded-full", column.color)} />
                        <span className="font-bold text-gray-400 tracking-wider text-sm ml-3">
                          {column.title}
                        </span>
                        <span className="ml-2 text-gray-400 text-sm">({taskCount})</span>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => openEditColumnModal(column)}
                            className="cursor-pointer"
                          >
                            Edit Column
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openCreateTaskModal(column.status)}
                            className="cursor-pointer"
                          >
                            Add Task
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteColumn(column.id)}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            Delete Column
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                      
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
                          {columnTasks.length > 0 ? (
                            columnTasks.map((task, index) => (
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
                      onClick={() => openCreateTaskModal(column.status)}
                      variant="outline"
                      className="mt-3 w-full border-dashed border-border bg-transparent hover:bg-muted/20 text-muted-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </motion.div>
                );
              })}
              
              {/* Add new column button */}
              <div className="flex items-center justify-center min-w-[300px] h-[100px] mt-16">
                <Button 
                  onClick={openAddColumnModal}
                  variant="outline" 
                  className="border-dashed border-border hover:border-primary bg-transparent hover:bg-muted/20 px-8 py-6"
                >
                  <Plus className="h-5 w-5 mr-2 text-primary" />
                  Add New Column
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DragDropContext>
      
      <CreateTaskModal />
      <EditTaskModal />
      <ColumnModal 
        isOpen={columnModalOpen}
        onClose={() => setColumnModalOpen(false)}
        column={selectedColumn}
      />
    </div>
  );
};
