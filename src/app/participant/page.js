import AssignedTasks from '@/components/dashboard/AssignedTasks';
import TasksTable from '@/components/common/TasksTable';
import LeaderboardTable from '@/components/dashboard/LeaderboardTable';

export default function UserPage() {
  return (
    <div>
      <h1 className='font-varela-round text-base md:text-lg lg:text-2xl'>
        Welcome, Ifihan
      </h1>
      <p className='lg:hidden mt-2'>
        <b>Track: </b>Front end Web Development
      </p>

      <div className='mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5'>
        <AssignedTasks />

        <LeaderboardTable className='col-span-2' />

        <TasksTable />
      </div>
    </div>
  );
}
