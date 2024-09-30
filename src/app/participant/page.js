import AssignedTasks from '@/components/dashboard/AssignedTasks';
import TasksTable from '@/components/common/TasksTable';
import LeaderboardTable from '@/components/dashboard/LeaderboardTable';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { getLeaderBoard } from '@/actions/leaderboard/leaderboard';
import { getTrackAdminTasks } from '@/actions/task actions/admin tasks';
import { currentServerUser } from '@/lib/serverAuthState';
import { getUserTasksAndStatuses } from '@/actions/task actions/admin tasks';
import { getUserGradeSummary } from '@/actions/participants/participant';

export default async function UserPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const result = await getLeaderBoard();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const result = await getUserTasksAndStatuses(user.id,user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['userGrade'],
    queryFn: async () => {
      const result = await getUserGradeSummary(user.id, user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <div>
      <h1 className='font-varela-round text-base md:text-lg lg:text-2xl'>
        Welcome, {user?.firstName}
      </h1>
      <p className='lg:hidden mt-2'>
        <b>Track: </b>{user?.track}
      </p>

      <div className='mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5'>
        

        <HydrationBoundary state={dehydrate(queryClient)}>
        <AssignedTasks />
        <LeaderboardTable className='col-span-2' track={user.track} />
        <TasksTable />
      </HydrationBoundary>
      </div>
    </div>
  );
}
