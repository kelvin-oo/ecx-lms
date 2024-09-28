import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getTutotDetailsAndStats } from "@/actions/superAdmin/super";
import { currentServerUser } from "@/lib/serverAuthState";
import Profile from "./Profile";
import { getAllUserAdminTasks } from "@/actions/superAdmin/super";
import TasksTable from "./Tasks";

export default async function AdminPage( { params } ) {
  const id = params.id
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await getTutotDetailsAndStats(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await getAllUserAdminTasks(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile id = {id} />
        <div className="mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-2 xl:gap-x-8 xl:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5">
        <TasksTable id={id} title={'Tasks'}/>
          </div>
        
      </HydrationBoundary>
    </>
  );
}
