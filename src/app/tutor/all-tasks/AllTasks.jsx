'use client';
import AdminTasksTable from '@/components/admin/AdminTasksTable';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import tasks from '@/sampleData/adminTasks.json';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getTrackAdminTasks } from '@/actions/task actions/admin tasks';
import { useQuery } from '@tanstack/react-query';

export default function AllTasks() {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const result = await getTrackAdminTasks();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });   
  const [isShowSubmissions, setShowSubmissions] = useState(false);

  const toggleShowSubmissions = () => setShowSubmissions(!isShowSubmissions);

  // console.log("🚀 ~ AllTasks ~ data:", data)

  return (
    
    <div>
      <div className='flex items-center justify-between lg:justify-end'>
        <p className='lg:hidden mt-2'>
          <b>Track: </b>Front end Web Development
        </p>

      </div>

      <div className='mt-5 flex flex-col gap-10 xl:gap-x-8 xl:gap-y-7'>
        <AdminTasksTable tasksArr={data} />

        {/* <div
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
        </div> */}

        {/* <SubmissionsTable display={isShowSubmissions} /> */}
      </div>
    </div>
  );
}
