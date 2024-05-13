import TableRow from "./TasksTableRow";
import tasks from "@/sampleData/tasks.json"

export default function TasksTable({ title, tasksData }) {
  const recentTasks = tasks.sort((a, b) => {
    const [aHour, aMinute, aSecond] = a.deadline.split(':').map(Number);
    const [bHour, bMinute, bSecond] = b.deadline.split(':').map(Number);

    const aTotalSeconds = aHour * 3600 + aMinute * 60 + aSecond;
    const bTotalSeconds = bHour * 3600 + bMinute * 60 + bSecond;

    return aTotalSeconds - bTotalSeconds;
  }).slice(0,3)

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

      {tasksData ? tasksData.map(({...props}, index) => (
        <TableRow key={index} {...props} />
      )) : recentTasks.map(({...props}, index) => (
        <TableRow key={index} {...props} />
      ))}
    </div>
  );
}
