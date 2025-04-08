
import { useParams, useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/organisms/AppHeader";
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Board not found</h2>
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
        return 'bg-blue-50';
      case 'green':
        return 'bg-green-50';
      case 'purple':
        return 'bg-purple-50';
      default:
        return 'bg-slate-50';
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
    <div className={`min-h-screen flex flex-col ${getThemeClass()}`}>
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/")}>
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{board.title}</h1>
              <p className="text-slate-500">{board.description}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <UserPlus size={14} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/board/edit/${boardId}`}>
                  <Pencil size={14} className="mr-2" />
                  Edit Board
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
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
            {columns.map((column) => {
              const columnTasks = boardTasks.filter(task => task.status === column.id);
              const columnColorClass = column.id === 'todo' 
                ? 'bg-task-todo text-blue-700' 
                : column.id === 'in-progress' 
                  ? 'bg-task-in-progress text-amber-700' 
                  : 'bg-task-done text-green-700';
              
              return (
                <motion.div 
                  key={column.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: column.id === 'todo' ? 0 : column.id === 'in-progress' ? 0.1 : 0.2 }}
                  className="flex flex-col h-full"
                >
                  <div className={`${columnColorClass} px-4 py-2 rounded-md font-medium text-sm mb-4 flex justify-between items-center`}>
                    <span>{column.title} ({columnTasks.length})</span>
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
                        className={`flex-1 min-h-[200px] p-2 rounded-md ${
                          snapshot.isDraggingOver ? 'bg-slate-100' : ''
                        } transition-colors duration-200`}
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
                          <div className="bg-white/50 rounded-md p-4 text-sm text-slate-500 text-center border border-dashed border-slate-200">
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
      </main>
    </div>
  );
};
