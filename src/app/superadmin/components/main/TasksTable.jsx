'use client'
import TableRow from "./TasksTableRow";
import tasks from "@/sampleData/tasks.json"
import { getTrackAdminTasks } from "@/actions/task actions/admin tasks";
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import { useQuery } from "@tanstack/react-query";
import { getUserTasksAndStatuses } from "@/actions/task actions/admin tasks";

export default function TasksTable({ title, tasksData }) {
  const user = useCurrentClientUser()
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await getUserTasksAndStatuses(user.id,user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success.slice(0,3);
    },
  }); 


  // const recentTasks = data.sort((a, b) => {
  //   const [aHour, aMinute, aSecond] = a.deadline.split(':').map(Number);
  //   const [bHour, bMinute, bSecond] = b.deadline.split(':').map(Number);

  //   const aTotalSeconds = aHour * 3600 + aMinute * 60 + aSecond;
  //   const bTotalSeconds = bHour * 3600 + bMinute * 60 + bSecond;

  //   return aTotalSeconds - bTotalSeconds;
  // }).slice(0,3)
  
  // console.log("🚀 ~ TasksTable ~ data:", data)

  return (
    
    <div className="col-span-3 text-[#424242] divide-y divide-black font-varela-round">
      <div className="grid grid-cols-7 gap-x-10 px-3 py-3 text-base lg:text-lg">
        <div className="col-span-5 lg:col-span-4 text-base lg:text-xl text-black">
          {title || "Recent tasks"}
        </div>
        <div className="text-center col-span-1 hidden lg:block">
          Status
        </div>
        <div className="text-end lg:text-center col-span-2 lg:col-span-1">
          Timer
        </div>
        <div className="text-center col-span-1 hidden lg:block">
          Grade
        </div>
      </div>

      {data.map(({...props}, index) => (
        <TableRow key={index} {...props} />
      )) }
    </div>
  );
}
