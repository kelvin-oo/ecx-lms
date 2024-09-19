'use client';
import AdminTasksTable from '@/components/admin/AdminTasksTable';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import tasks from '@/sampleData/adminTasks.json';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getTrackSubmissions } from "@/actions/tutor/tutor";

export default function AllSubmissions() {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["track-submissions"],
    queryFn: async () => {
      const result = await getTrackSubmissions();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
    refetchInterval: 2000,
  });   
  const [isShowSubmissions, setShowSubmissions] = useState(true);

  const toggleShowSubmissions = () => setShowSubmissions(!isShowSubmissions);
  // console.log("🚀 ~ AllSubmissions ~ data:", data)

  return (
   
    <div>
      <div className='flex items-center justify-between lg:justify-end'>
        <p className='lg:hidden mt-2'>
          <b>Track: </b>Front end Web Development
        </p>

       
      </div>

      <div className='mt-5 flex flex-col gap-10 xl:gap-x-8 xl:gap-y-7'>
        {/* <AdminTasksTable tasksArr={tasks} />

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
        </div> */}

        <SubmissionsTable display={isShowSubmissions} data={data} />
      </div>
    </div>
  );
}
