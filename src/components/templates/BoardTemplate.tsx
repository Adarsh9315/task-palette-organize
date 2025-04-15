
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";
import { ColumnModal } from "@/components/organisms/ColumnModal";
import { TaskColumn } from "@/components/molecules/TaskColumn";
import { AddColumnButton } from "@/components/molecules/AddColumnButton";
import { BoardLoading } from "@/components/molecules/BoardLoading";
import { BoardError } from "@/components/molecules/BoardError";
import { useBoardData } from "@/hooks/use-board-data";
import { useTaskOperations } from "@/hooks/use-task-operations";

export const BoardTemplate = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { isLoading, error, board, columns, tasks } = useBoardData(boardId);
  const { 
    handleDragEnd, 
    openCreateTaskModal, 
    openAddColumnModal, 
    openEditColumnModal, 
    deleteColumn, 
    columnModalOpen, 
    setColumnModalOpen, 
    selectedColumn 
  } = useTaskOperations(boardId);
  
  if (isLoading) {
    return <BoardLoading />;
  }
  
  if (error || !board || !boardId) {
    return <BoardError error={error} />;
  }
  
  return (
    <div className="h-full flex flex-col bg-background w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 w-full overflow-hidden">
          <div className="h-full overflow-x-auto">
            <div className="flex p-4 gap-6 min-h-[calc(100vh-64px)] pb-20 board-container">
              {columns.map((column, idx) => {
                const columnTasks = tasks.filter(task => task.status === column.status);
                
                return (
                  <TaskColumn 
                    key={column.id}
                    column={column}
                    tasks={columnTasks}
                    index={idx}
                    onEditColumn={openEditColumnModal}
                    onAddTask={openCreateTaskModal}
                    onDeleteColumn={deleteColumn}
                  />
                );
              })}
              
              <AddColumnButton onClick={openAddColumnModal} />
            </div>
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
