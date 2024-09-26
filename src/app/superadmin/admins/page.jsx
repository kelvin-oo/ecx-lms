import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { currentServerUser } from "@/lib/serverAuthState";
import { getAdminAndTutorUsers } from "@/actions/superAdmin/super";
import AdminAndTutorList from "./AdminAndTutorList";

export default async function AdminPage() {
  const user = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['adminsxtutors'],
    queryFn: async () => {
      const result = await getAdminAndTutorUsers();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminAndTutorList />
        </HydrationBoundary>
    </>
  );
}
