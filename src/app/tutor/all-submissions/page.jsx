import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllSubmissions from "./AllSubmissions";
import { getTrackSubmissions } from "@/actions/tutor/tutor";



async function page() {
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
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <AllSubmissions />
        </HydrationBoundary>
    </div>
  );
}

export default page;
