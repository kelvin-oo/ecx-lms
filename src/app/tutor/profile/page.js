import TutorProfile from "./TutorProfile"
import { getTrackParticipantCount, getUserWithHighestPoints, getUserWithHighestTaskCompleted, getUngradedSubmissionsCountByTrack,getSubmissionsGradedOnDateByTrack } from "@/actions/tutor/tutor"

export default async function page() {
  const participantCount = await getTrackParticipantCount()
  const highestScoreParticipant = await getUserWithHighestPoints()
  const highestTaskParticipant = await getUserWithHighestTaskCompleted()
  const ungradedTaskCount = await getUngradedSubmissionsCountByTrack()
  const taskGradedToday = await getSubmissionsGradedOnDateByTrack()
  console.log("🚀 ~ page ~ taskGradedToday:", taskGradedToday)
  console.log("🚀 ~ page ~ ungradedTaskCount:", ungradedTaskCount)
  console.log("🚀 ~ page ~ highestTaskParticipant:", highestTaskParticipant)
  console.log("🚀 ~ page ~ highestScoreParticipant:", highestScoreParticipant)
  console.log("🚀 ~ page ~ participantCount:", participantCount)
  return (
    <div>
      <TutorProfile />
    </div>
  )
}
