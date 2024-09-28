import ParticipantProfile from "./ParticipantProfile"
import { currentServerUser } from "@/lib/serverAuthState"
import { getParticipantProfile } from "@/actions/participants/participant"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function page() {
  const session = await currentServerUser()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const result = await getParticipantProfile(session.id)
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
    staleTime: 0,
    cacheTime: 0,
  });
  // console.log("🚀 ~ page ~ user:", user)

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ParticipantProfile id={session.id} />
      </HydrationBoundary>
    </div>
  )
}
