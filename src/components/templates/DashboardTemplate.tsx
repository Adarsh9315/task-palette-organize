
import { BoardList } from "@/components/organisms/BoardList";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";

export const DashboardTemplate = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your boards and tasks</p>
      </div>
      <BoardList />
      <CreateTaskModal />
      <EditTaskModal />
    </>
  );
};
