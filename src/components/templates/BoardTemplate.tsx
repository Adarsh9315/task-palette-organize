
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
  
  // Column modal state
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>(undefined);
  
  if (!board || !boardId) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Board not found</h2>
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
    
    // Update the task's status based on the destination droppableId
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: destination.droppableId as "todo" | "in-progress" | "done"
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
  
  // Get number of tasks per status
  const getTaskCountByStatus = (status: string) => {
    return boardTasks.filter(task => task.status === status).length;
  };
  
  return (
    <div className="min-h-full p-4 bg-[#1A1F2C] w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto pb-6 gap-6">
          {columns.map((column, idx) => {
            const columnTasks = boardTasks.filter(task => task.status === column.status);
            const taskCount = getTaskCountByStatus(column.status);
            
            return (
              <motion.div 
                key={column.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex flex-col h-full min-w-[300px] max-w-[300px]"
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
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#2B2C37] border-gray-700 text-white">
                      <DropdownMenuItem 
                        onClick={() => openEditColumnModal(column)}
                        className="cursor-pointer hover:bg-gray-700"
                      >
                        Edit Column
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => openCreateTaskModal(column.status)}
                        className="cursor-pointer hover:bg-gray-700"
                      >
                        Add Task
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
                        "flex-1 min-h-[calc(100vh-240px)] transition-colors duration-200 rounded-lg p-2",
                        snapshot.isDraggingOver ? 'bg-gray-800/20' : ''
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
                        <div className="rounded-md p-4 text-sm text-gray-400 border border-dashed border-gray-700 h-24 flex items-center justify-center">
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
                  className="mt-3 w-full border-dashed border-gray-700 bg-transparent hover:bg-gray-800/50 text-gray-400"
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
              className="border-dashed border-gray-700 hover:border-primary bg-transparent hover:bg-gray-800/50 px-8 py-6"
            >
              <Plus className="h-5 w-5 mr-2 text-primary" />
              Add New Column
            </Button>
          </div>
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
