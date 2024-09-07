import TutorProfile from "./TutorProfile"
import { getTrackParticipantCount, getUserWithHighestPoints, getUserWithHighestTaskCompleted, getUngradedSubmissionsCountByTrack } from "@/actions/tutor/tutor"

export default async function page() {
  const participantCount = await getTrackParticipantCount()
  const highestScoreParticipant = await getUserWithHighestPoints()
  const highestTaskParticipant = await getUserWithHighestTaskCompleted()
  const ungradedTaskCount = await getUngradedSubmissionsCountByTrack()

  console.log("🚀 ~ page ~ ungradedTaskCount:", ungradedTaskCount)
  console.log("🚀 ~ page ~ highestTaskParticipant:", highestTaskParticipant)
  console.log("🚀 ~ page ~ highestScoreParticipant:", highestScoreParticipant)
  console.log("🚀 ~ page ~ participantCount:", participantCount)
  return (
    <div>
      <TutorProfile participantCount={participantCount} highestScoreParticipant={highestScoreParticipant} highestTaskParticipant={highestTaskParticipant} ungradedTaskCount={ungradedTaskCount} />
    </div>
  )
}
