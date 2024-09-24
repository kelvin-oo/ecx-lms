'use client';
import TableRow from '../components/main/TasksTableRow';
import {  getAllAdminTasks } from '@/actions/superAdmin/super';
import { useQuery } from '@tanstack/react-query';

export default function AdminTasks({ title, tasksData }) {
    const { data, error, isLoading, isFetched } = useQuery({
        queryKey: [`tasks`],
        queryFn: async () => {
          const result = await getAllAdminTasks();
          if (result.error) {
            throw new Error(result.error);
          }
          return result.success;
        },
      });   
      console.log("🚀 ~ AdminsList ~ data:", data)
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

      {data?.map(({ ...props }, index) => (
        <TableRow key={index} {...props} />
      ))}
    </div>
  );
}
