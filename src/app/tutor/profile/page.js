import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TutorProfile from "./TutorProfile"
import { getTrackParticipantCount, getUserWithHighestPoints, getUserWithHighestTaskCompleted, getUngradedSubmissionsCountByTrack } from "@/actions/tutor/tutor"
import { getParticipantProfile } from "@/actions/participants/participant";

export default async function page() {
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
  const participantCount = await getTrackParticipantCount()
  const highestScoreParticipant = await getUserWithHighestPoints()
  const highestTaskParticipant = await getUserWithHighestTaskCompleted()
  const ungradedTaskCount = await getUngradedSubmissionsCountByTrack()

  // console.log("🚀 ~ page ~ ungradedTaskCount:", ungradedTaskCount)
  // console.log("🚀 ~ page ~ highestTaskParticipant:", highestTaskParticipant)
  // console.log("🚀 ~ page ~ highestScoreParticipant:", highestScoreParticipant)
  // console.log("🚀 ~ page ~ participantCount:", participantCount)
  return (
    <div>
       <HydrationBoundary state={dehydrate(queryClient)}>
       <TutorProfile participantCount={participantCount} highestScoreParticipant={highestScoreParticipant} highestTaskParticipant={highestTaskParticipant} ungradedTaskCount={ungradedTaskCount} />
      </HydrationBoundary>
    </div>
  )
}
