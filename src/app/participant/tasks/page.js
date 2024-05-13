'use client'
import TasksTable from '@/components/common/TasksTable'
import React from 'react'
import tasks from "@/sampleData/tasks.json"
import Timer from '@/components/common/Timer'
import Link from 'next/link'

const UserTasksPage = () => {
  const sortedTasks = tasks.sort((a, b) => {
    const [aHour, aMinute, aSecond] = a.deadline.split(':').map(Number);
    const [bHour, bMinute, bSecond] = b.deadline.split(':').map(Number);

    const aTotalSeconds = aHour * 3600 + aMinute * 60 + aSecond;
    const bTotalSeconds = bHour * 3600 + bMinute * 60 + bSecond;

    return aTotalSeconds - bTotalSeconds;
  })
  
  return (
    <div>
      <h1 className='font-varela-round lg:text-2xl mb-5 lg:mb-8'>Welcome, Ifihan</h1>

      <div className='hidden lg:block bg-white border-[1.5px] border-ecx-colors-secondary-blue shadow-[7px_7px_rgba(39,46,75,1)] py-6 px-5'>
        <TasksTable tasksData={sortedTasks} title={"Tasks"} />
      </div>

      <div className='lg:hidden'>
        <h2 className='font-varela-round text-[18px] mb-1.5'>Tasks</h2>

        <div className='flex flex-col gap-4'>
          {sortedTasks.map(({ id, title, status, deadline, grade }, index) => (
            <Link
              key={index}
              href={`/user/description/${id}`}
              className='border border-black py-3 px-3.5 transition-colors hover:bg-white'
            >
              <p className='truncate mb-4 font-varela-round'>{title}</p>

              <div className='grid grid-cols-3 place-items-center text-center'>
                <div className='col-span-1'>
                  <h3 className='font-varela-round'>Status</h3>
                  <p className='text-xs'>{status}</p>
                </div>
                <div className='col-span-1'>
                  <h3 className='font-varela-round'>Timer</h3>
                  <Timer initDeadline={deadline} />
                </div>
                <div className='col-span-1'>
                  <h3 className='font-varela-round'>Grade</h3>
                  <p className='text-xs'>{grade}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserTasksPage;