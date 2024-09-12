'use client'
import submissions from "@/sampleData/submissions.json"
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import Link from "next/link";

import { getSingleSubmission2, getTrackSubmissions, getUserSubmissions } from "@/actions/tutor/tutor";
import { useState } from "react";

export default function SubmissionsTableMain( { id } ) {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["sub"],
    queryFn: async () => {
      const result = await getSingleSubmission2(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });   
  const [activeItemId, setActiveItemId] = useState(null);

  const toggleActions = (itemId) => {
    setActiveItemId(activeItemId === itemId ? null : itemId);
  };
  console.log("🚀 ~ Grading ~ data:", data)
  const formatDate1 = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='mt-5 flex flex-col gap-10 xl:gap-x-8 xl:gap-y-7'>
        {/* <AdminTasksTable tasksArr={tasks} /> */}

        <div
          
          className='flex items-center justify-between py-3 border-b border-black select-none cursor-pointer'
        >
          <span>{data[0].participant.lastName}'s Task Submissions</span>
          <Image
            src='/icons/chevron-down-black.svg'
            className={`transition-transform`}
            alt='arrow'
            width={20}
            height={20}
          />
        </div>
    <div className={`col-span-1 flex flex-col gap-6 lg:gap-8 xl:gap-10 bg-white border-[1.5px] border-[#B0AFAF] py-6 px-5 lg:px-8`}>
      <div className="divide-y divide-black [&>*]:py-3.5">
        <div className="grid grid-cols-11 gap-x-10 py-2 lg:text-lg font-varela-round font-bold">
          {/* <div className="col-span-1 text-center">
            ID
          </div> */}
          <div className="col-span-3">
           Task
          </div>
          <div className="col-span-3 text-center truncate">
            Submission Status
          </div>
          <div className="col-span-3 text-center truncate">
            Submission Date
          </div>
        </div>
      
        {data.map(({id,  task, status, submittedAt }, index) => (
          <div key={index} className="grid grid-cols-11 gap-x-10 py-1.5 text-sm lg:text-base font-light">
            {/* <div className="col-span-1 text-center">
              {id}
            </div> */}
            <div className="col-span-3 truncate">
              {task.title}
            </div>
            <div className="col-span-3 text-center">
              {status}
            </div>
            <div className="col-span-3 text-center">
              {formatDate1(submittedAt)}
            </div>
            <div className="col-span-1 font-medium relative" onClick={() => toggleActions(id)}>
              <p className="rotate-90 absolute right-1/2">
                ...
              </p>
              {activeItemId === id && (
                  <div className="flex flex-col gap-3 absolute bg-white shadow-lg right-10 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm">
                    <Link href={`/tutor/grading/${id}`}>
                      <button className="outline-none">Grade Task</button>
                    </Link>
                    <hr className="border-grey" />
                    <button className="outline-none">Delete Participant</button>
                    <hr className="border-grey" />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
