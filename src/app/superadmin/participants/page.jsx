import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { currentServerUser } from "@/lib/serverAuthState";
import { getAdminParticipants } from "@/actions/superAdmin/super";
import AdminParticipantList from "./AdminParticipantList";

export default async function AdminPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['participants'],
    queryFn: async () => {
      const result = await getAdminParticipants();
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
