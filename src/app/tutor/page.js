"use client";
import AdminTasksTable from "@/components/admin/AdminTasksTable";
import ParticipantsTable from "@/components/admin/ParticipantsTable";
import LeaderboardTable from "@/components/dashboard/LeaderboardTable";
import tasks from "@/sampleData/adminTasks.json";

export default function AdminPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          Welcome, Ifihan
        </h1>

        <button className="bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity">
          Task Management
        </button>
      </div>
      <p className="lg:hidden mt-2">
        <b>Track: </b>Front end Web Development
      </p>

      <div className="mt-5 flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5">
        <LeaderboardTable className="col-span-1" />
        <AdminTasksTable minimized tasksArr={tasks.slice(0, 3)} />
        <ParticipantsTable />
      </div>
    </div>
  );
}
