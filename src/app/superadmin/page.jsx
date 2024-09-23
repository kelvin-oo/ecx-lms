import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import AdminsList from './components/main/AdminsList';
import TasksTable from '@/app/superadmin/components/main/RecentTasksTable';
import { currentServerUser } from "@/lib/serverAuthState";
import { getPartialAdminAndTutorUsers, getPartialAdminParticipants, getPartialAdminTasks } from "@/actions/superAdmin/super";

export default async function AdminPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['adminsxtutors'],
    queryFn: async () => {
      const result = await getPartialAdminAndTutorUsers();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['participants'],
    queryFn: async () => {
      const result = await getPartialAdminParticipants();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const result = await getPartialAdminTasks();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='font-varela-round md:text-lg lg:text-2xl'>
          Welcome, Ifihan
        </h1>

        <button className='bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity'>
          Add new admin
        </button>
      </div>
      <p className='lg:hidden mt-2'>
        <b>Track: </b>Front end Web Development
      </p>

      <div className='mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-2 xl:gap-x-8 xl:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminsList className='col-span-1' role={'ADMINS'} route={'admins'} fetch={`adminsxtutors`} action={getPartialAdminAndTutorUsers} />
        <AdminsList className='col-span-1' role={'PARTICIPANTS'} route={'participants'} fetch={`participants`} action={getPartialAdminParticipants}/>
        <TasksTable />
        </HydrationBoundary>
      </div>
    </div>
  );
}
