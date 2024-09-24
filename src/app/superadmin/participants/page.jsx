import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { currentServerUser } from "@/lib/serverAuthState";
import { getAllAdminTasks } from "@/actions/superAdmin/super";
import AdminParticipantList from "./AdminParticipantList";

export default async function AdminPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const result = await getAllAdminTasks();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminParticipantList />
        </HydrationBoundary>
    </>
  );
}
