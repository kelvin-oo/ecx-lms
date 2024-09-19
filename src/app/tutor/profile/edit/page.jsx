import EditProfile from "./EditProfile"
import { currentServerUser } from "@/lib/serverAuthState"
import { getParticipantProfile } from "@/actions/participants/participant"

export default async function page() {
  const session = await currentServerUser()
  const user = await getParticipantProfile(session.id)
  // console.log("🚀 ~ page ~ user:", user)
  
  return (
    <div>
      <EditProfile user={user.success} />
    </div>
  )
}
