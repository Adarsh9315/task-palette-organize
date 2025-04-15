
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    { id: "todo", title: "TODO", color: "bg-[#00A3FF]", textColor: "text-[#00A3FF]" },
    { id: "in-progress", title: "DOING", color: "bg-primary", textColor: "text-primary" },
    { id: "done", title: "DONE", color: "bg-[#00CA92]", textColor: "text-[#00CA92]" }
  ];
  
  // Get number of tasks per status
  const todoCount = boardTasks.filter(task => task.status === "todo").length;
  const inProgressCount = boardTasks.filter(task => task.status === "in-progress").length;
  const doneCount = boardTasks.filter(task => task.status === "done").length;
  
  const counts = {
    "todo": todoCount,
    "in-progress": inProgressCount,
    "done": doneCount
  };
  
  return (
    <div className="min-h-full p-4 bg-[#1A1F2C]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
          {columns.map((column, idx) => {
            const columnTasks = boardTasks.filter(task => task.status === column.id);
            
            return (
              <motion.div 
                key={column.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center mb-6">
                  <div className={`h-3 w-3 rounded-full ${column.color} mr-3`}></div>
                  <span className="font-bold text-gray-400 tracking-wider text-sm">{column.title}</span>
                  <span className="ml-2 text-gray-400 text-sm">({counts[column.id as keyof typeof counts]})</span>
                </div>
                  
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "flex-1 min-h-[200px] transition-colors duration-200",
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
              </motion.div>
            );
          })}
        </div>
      </DragDropContext>
      
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={() => openCreateTaskModal("todo")} 
          className="rounded-full bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2" />
          New Column
        </Button>
      </div>
        
      <CreateTaskModal />
      <EditTaskModal />
    </div>
  );
};
