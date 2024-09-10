'use client'
import submissions from "@/sampleData/submissions.json";
import { formatDate } from "@/lib/date";
import Link from "next/link";
import { useState } from "react";

export default function SubmissionsTable({ display, data }) {
  const [activeItemId, setActiveItemId] = useState(null);

  const toggleActions = (itemId) => {
    setActiveItemId(activeItemId === itemId ? null : itemId);
  };
  return (
    <div
      className={`col-span-1 flex flex-col gap-6 lg:gap-8 xl:gap-10 bg-white border-[1.5px] border-[#B0AFAF] py-6 px-5 lg:px-8 ${
        !display && "hidden"
      }`}
    >
      <div className="divide-y divide-black [&>*]:py-3.5">
        <div className="grid grid-cols-11 gap-x-10 py-2 lg:text-lg font-varela-round font-bold">
          <div className="col-span-1 text-center">ID</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-3 text-center truncate">
            Submission Status
          </div>
          <div className="col-span-3 text-center truncate">Submission Date</div>
        </div>

        {data?.map(
          ({id, status, lastName, firstName, participant, task }, index) => (
            <div
              key={index}
              className="grid grid-cols-11 gap-x-10 py-1.5 text-sm lg:text-base font-light"
            >
              <div className="col-span-1 text-center">{index + 1}</div>
              <div className="col-span-3 truncate">
                {participant.firstName} {participant.lastName}
              </div>
              <div className="col-span-3 text-center">{status}</div>
              <div className="col-span-3 text-center">
                <div className="col-span-3 text-center">
                  {task.deadline
                    ? formatDate(task.deadline)
                    : "No deadline set"}
                </div>
              </div>
              <div className="col-span-1 font-medium relative"  onClick={() => toggleActions(id)}>
                <p className="rotate-90 absolute right-1/2">...</p>
                {activeItemId === id && (
                  <div className="flex flex-col gap-3 absolute bg-white shadow-lg right-10 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm">
                    <Link href={`/admin/grading/${id}`}>
                      <button className="outline-none">Grade Task</button>
                    </Link>
                    <hr className="border-grey" />
                    <button className="outline-none">Delete Participant</button>
                    <hr className="border-grey" />
                  </div>
                )}
              </div>
            </div>
          )
        )}
        
      </div>
    </div>
  );
}
