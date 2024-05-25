
import AdminTasksTable from "@/components/admin/AdminTasksTable";
// import ParticipantsTable from "@/components/admin/ParticipantsTable";
import LeaderboardTable from "@/components/dashboard/LeaderboardTable";
import { getPartialAdminTasks } from "@/actions/task actions/admin tasks";
import { currentServerUser } from "@/lib/serverAuthState";
import { getAllAdminTasks } from "@/actions/task actions/admin tasks";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAllParticipants } from "@/actions/participants/participant";


export default async function AdminPage() {
  const tasks = await getPartialAdminTasks(4)
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['leaders'],
    queryFn: getAllParticipants
  })
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          Welcome, {user.firstName}
        </h1>

        <button className="bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity">
          Task Management
        </button>
      </div>
      <p className="lg:hidden mt-2">
        <b>Track: </b>Front end Web Development
      </p>

      <div className="mt-5 flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LeaderboardTable className="col-span-1" />
        </HydrationBoundary>

        <AdminTasksTable minimized tasksArr={tasks} />
        {/* <ParticipantsTable /> */}
      </div>
    </div>
  );
}
