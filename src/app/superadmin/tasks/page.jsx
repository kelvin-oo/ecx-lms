'use client';
import TableRow from '../components/main/TasksTableRow';
import tasks from '../../../sampleData/tasks.json';
// import { getTrackAdminTasks } from '@/actions/task actions/admin tasks';
// import { useCurrentClientUser } from '@/hooks/use-current-client-user';
// import { useQuery } from '@tanstack/react-query';
// import { getUserTasksAndStatuses } from '@/actions/task actions/admin tasks';

export default function Page({ title, tasksData }) {
  return (
    <div className='col-span-3 text-[#424242] divide-y divide-black font-varela-round bg-white    [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5'>
      <div className='grid grid-cols-7 gap-x-10 px-3 py-3 text-base lg:text-lg'>
        <div className='col-span-5 lg:col-span-4 text-base lg:text-xl text-black'>
          {title || 'Tasks'}
        </div>
        <div className='text-center col-span-1 hidden lg:block'>Status</div>
        <div className='text-end lg:text-center col-span-2 lg:col-span-1'>
          Timer
        </div>
        <div className='text-center col-span-1 hidden lg:block'>Grade</div>
      </div>

      {tasks.map(({ ...props }, index) => (
        <TableRow key={index} {...props} />
      ))}
    </div>
  );
}
