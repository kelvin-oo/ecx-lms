import { getSingleAdminTask } from "@/actions/task actions/admin tasks"
import EditTask from "./EditTask"

async function page({ params }) {
    const id = params.id
    // console.log("🚀 ~ page ~ id:", id)
    const oldData = await getSingleAdminTask(id)
    // console.log("🚀 ~ page ~ oldData:", oldData)
  return (
    <div>
        <EditTask id={id} oldData={oldData} />
    </div>
  )
}

export default page