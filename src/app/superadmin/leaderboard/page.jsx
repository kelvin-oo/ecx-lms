import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { currentServerUser } from "@/lib/serverAuthState";
import { getAdminLeaderBoard } from "@/actions/superAdmin/super";
import AdminLeaderBoard from "./AdminLeaderBoard";

export default async function AdminPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const result = await getAdminLeaderBoard();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminLeaderBoard />
        </HydrationBoundary>
    </>
  );
}
