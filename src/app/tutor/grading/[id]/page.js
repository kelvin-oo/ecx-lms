import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getSingleSubmission } from '@/actions/tutor/tutor';
import Grading from "./Grading"
async function page({ params }) {
  const id = params.id
    const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['submission'],
    queryFn: async () => {
      const result = await getSingleSubmission(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Grading id={id} />
        </HydrationBoundary>
    </div>
  )
}

export default page