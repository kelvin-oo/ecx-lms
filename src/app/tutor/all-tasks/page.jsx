import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllTasks from "../all-tasks/AllTasks"
import { getTrackAdminTasks } from "@/actions/task actions/admin tasks";

async function page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['all-tasks'],
    queryFn: async () => {
      const result = await getTrackAdminTasks();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <AllTasks />
        </HydrationBoundary>
    </div>
  )
}

export default page