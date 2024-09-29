import Submission from "./Submission"
import { getUserSingleTaskAndStatuses } from "@/actions/task actions/admin tasks"
import { currentServerUser } from "@/lib/serverAuthState"



export default async function SubmissionPage({ params }) {
  const user = await currentServerUser()
  const data = await getUserSingleTaskAndStatuses(user.id, params.id)
 
  // console.log("🚀 ~ SubmissionPage ~ data:", data)
  
  // taskid = cm0mt9ixx0001q45b6z0r7x8v
  // partiid = cm0idnmjf000052hdqwgksae8

  return(
    <>
    <Submission data={data} />
    </>
  )
}
