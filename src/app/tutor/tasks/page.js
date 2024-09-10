import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AdminTasksPage from "./Tasks";
import { getTrackSubmissions } from "@/actions/tutor/tutor";
import { getTrackAdminTasks } from "@/actions/task actions/admin tasks";



async function page() {
  const tasks = await getTrackAdminTasks() 
  
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['track-submissions'],
    queryFn: async () => {
      const result = await getTrackSubmissions();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['track-tasks'],
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
          <AdminTasksPage />
        </HydrationBoundary>
    </div>
  );
}

export default page;
