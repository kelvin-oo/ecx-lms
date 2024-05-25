import { getAllAdminTasks } from "@/actions/task actions/admin tasks"


const page = async () => {
    const tasks = await getAllAdminTasks()
    console.log(tasks)
  return (
    <div>page</div>
  )
}

export default page