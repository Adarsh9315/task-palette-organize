
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Plus, Settings, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardByIdSelector } from "@/recoil/selectors/boardSelectors";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { tasksState } from "@/recoil/atoms/tasksAtom";
import { TaskCard } from "@/components/molecules/TaskCard";
import { useState } from "react";
import { filteredTasksSelector } from "@/recoil/selectors/taskSelectors";
import { createTaskModalState } from "@/recoil/atoms/modalAtom";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoardTemplate = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [tasks, setTasks] = useRecoilState(tasksState);
  const board = useRecoilValue(boardByIdSelector(boardId || ""));
  const boardTasks = useRecoilValue(filteredTasksSelector(boardId || ""));
  const [showUserMenu, setShowUserMenu] = useState(false);
  const setCreateModal = useRecoilState(createTaskModalState)[1];
  
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

  // Get theme class based on board theme
  const getThemeClass = () => {
    switch (board.theme) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'amber':
        return 'bg-amber-50 dark:bg-amber-900/20';
      case 'rose':
        return 'bg-rose-50 dark:bg-rose-900/20';
      default:
        return 'dark:bg-gray-900';
    }
  };
  
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
  };
  
  const openCreateTaskModal = (status: string) => {
    setCreateModal({
      isOpen: true,
      boardId,
      initialStatus: status
    });
  };
  
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" }
  ];
  
  return (
    <div className={cn("min-h-full p-4", getThemeClass())}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{board.title}</h1>
            <p className="text-slate-500 dark:text-slate-300">{board.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="dark:bg-gray-800 dark:border-gray-700"
            >
              <UserPlus size={14} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" asChild className="dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/board/edit/${boardId}`}>
                <Pencil size={14} className="mr-2" />
                Edit Board
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/settings`}>
                <Settings size={14} className="mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
        
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
          {columns.map((column, idx) => {
            const columnTasks = boardTasks.filter(task => task.status === column.id);
            
            let columnStyle = "";
            if (column.id === 'todo') {
              columnStyle = 'bg-blue-100/60 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            } else if (column.id === 'in-progress') {
              columnStyle = 'bg-amber-100/60 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
            } else {
              columnStyle = 'bg-green-100/60 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            }
              
            return (
              <motion.div 
                key={column.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex flex-col h-full"
              >
                <div className={cn(
                  "px-4 py-2 rounded-md font-medium text-sm mb-4 flex justify-between items-center",
                  columnStyle
                )}>
                  <span className="flex items-center">
                    {column.title} 
                    <span className="ml-2 bg-white/50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full text-xs">
                      {columnTasks.length}
                    </span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 ml-2 rounded-full"
                    onClick={() => openCreateTaskModal(column.id)}
                  >
                    <Plus size={14} />
                    <span className="sr-only">Add Task</span>
                  </Button>
                </div>
                  
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "flex-1 min-h-[200px] p-2 rounded-md transition-colors duration-200",
                        snapshot.isDraggingOver ? 'bg-slate-100 dark:bg-gray-800/50' : ''
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
                                  marginBottom: '8px',
                                }}
                              >
                                <TaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-md p-4 text-sm text-slate-500 dark:text-slate-400 text-center border border-dashed border-slate-200 dark:border-gray-700">
                          Drop tasks here
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            );
          })}
        </div>
      </DragDropContext>
        
      <CreateTaskModal />
      <EditTaskModal />
    </div>
  );
};
