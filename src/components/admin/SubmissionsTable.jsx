import submissions from "@/sampleData/submissions.json";
import { formatDate } from "@/lib/date";

export default function SubmissionsTable({ display, data }) {
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
          ({ status, lastName, firstName, participant, task }, index) => (
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
              <div className="col-span-1 font-medium relative">
                <p className="rotate-90 absolute right-1/2">...</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
