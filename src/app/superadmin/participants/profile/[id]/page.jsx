import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getUserDetailsAndTaskInfo } from "@/actions/superAdmin/super";
import { currentServerUser } from "@/lib/serverAuthState";
import Profile from "./Profile";

export default async function AdminPage( { params } ) {
  const id = params.id
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await getUserDetailsAndTaskInfo(id);
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
      </HydrationBoundary>
    </>
  );
}
