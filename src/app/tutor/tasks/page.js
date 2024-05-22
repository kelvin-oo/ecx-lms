'use client';
import AdminTasksTable from '@/components/admin/AdminTasksTable';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import tasks from '@/sampleData/adminTasks.json';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminTasksPage() {
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
        <AdminTasksTable tasksArr={tasks} />

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

        <SubmissionsTable display={isShowSubmissions} />
      </div>
    </div>
  );
}
