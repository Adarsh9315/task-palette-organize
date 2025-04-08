
import { AppHeader } from "@/components/organisms/AppHeader";
import { BoardList } from "@/components/organisms/BoardList";
import { CreateTaskModal } from "@/components/organisms/CreateTaskModal";
import { EditTaskModal } from "@/components/organisms/EditTaskModal";

export const DashboardTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <BoardList />
        <CreateTaskModal />
        <EditTaskModal />
      </main>
    </div>
  );
};
