'use client';
import AdminTasksTable from '@/components/admin/AdminTasksTable';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import tasks from '@/sampleData/adminTasks.json';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getTrackSubmissions } from "@/actions/tutor/tutor";
import { getTrackAdminTasks } from '@/actions/task actions/admin tasks';

export default function AdminTasksPage({ tasks }) {
    const { data, error, isLoading, isFetched } = useQuery({
        queryKey: ["track-submissions"],
        queryFn: async () => {
          const result = await getTrackSubmissions();
          if (result.error) {
            throw new Error(result.error);
          }
          return result.success;
        },
      });   

    const { data:taskData, taskError, taskIsLoading, taskIsFetched } = useQuery({
        queryKey: ["track-tasks"],
        queryFn: async () => {
          const result = await getTrackAdminTasks();
          if (result.error) {
            throw new Error(result.error);
          }
          return result.success;
        },
      });   
      // console.log("🚀 ~ page ~ submissions:", data)
      // console.log("🚀 ~ page ~ tasks:", taskData)
  const [isShowSubmissions, setShowSubmissions] = useState(false);

  const toggleShowSubmissions = () => setShowSubmissions(!isShowSubmissions);

  return (
    <div>
      <div className='flex items-center justify-between lg:justify-end'>
        <p className='lg:hidden mt-2'>
          <b>Track: </b>Front end Web Development
        </p>

        <Link href='/tutor/add-newtask'>
          <button className='bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity'>
            Add New Task
          </button>
        </Link>
      </div>

      <div className='mt-5 flex flex-col gap-10 xl:gap-x-8 xl:gap-y-7'>
        <AdminTasksTable tasksArr={taskData.slice(0,4)} />
        <button className="border border-1.5 border-ecx-colors-secondary-blue flex items-center py-0.5 lg:py-1 px-2 lg:px-4 gap-1.5 lg:gap-4 font-medium self-end text-sm lg:text-base">
        <Link href="/tutor/all-tasks">View All</Link>
      </button>
        <div
          onClick={toggleShowSubmissions}
          className='flex items-center justify-between py-3 border-b border-black select-none cursor-pointer'
        >
          <span>Show Task Submissions</span>
          <Image
            src='/icons/chevron-down-black.svg'
            className={`transition-transform ${
              isShowSubmissions && 'rotate-180'
            }`}
            alt='arrow'
            width={20}
            height={20}
          />
        </div>

        <SubmissionsTable display={true} data={data} />
        <button className="border border-1.5 border-ecx-colors-secondary-blue flex items-center py-0.5 lg:py-1 px-2 lg:px-4 gap-1.5 lg:gap-4 font-medium self-end text-sm lg:text-base">
        <Link href="/tutor/all-submissions">View All</Link>
      </button>
       
      </div>
    </div>
  );
}
