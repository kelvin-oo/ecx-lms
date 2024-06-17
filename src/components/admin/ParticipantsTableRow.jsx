import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ParticipantsTableRow = ({ id, firstName, lastName, email, taskScore, taskCompleted, index, noOfTasks }) => {
  const [showActions, setShowActions] = useState(false);

  const onActionClick = () => setShowActions(!showActions);

  return (
    <div className="divide-y text-[#424242] divide-black font-varela-round">
      <div className="grid grid-cols-12 gap-x-10 px-3 py-3 text-base lg:text-lg ">
        <div className="">{index + 1}</div>
        <div className="col-span-2">{firstName} {lastName}</div>
        <div className="w-[8.25rem] col-span-3">{email}</div>
        <div className="text-center col-span-2">{taskScore}</div>
        <div className="text-center col-span-2 ">{taskCompleted} / {noOfTasks}</div>
        <div className="grid place-content-center col-span-2">
          <Image
            onClick={onActionClick}
            src="/icons/action-button.svg"
            alt="action"
            width={16}
            height={16}
          ></Image>
        </div>

        {showActions && (
          <div
            onClick={onActionClick}
            className="flex flex-col gap-3 absolute bg-white shadow-lg right-10 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm"
          >
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
  );
};

export default ParticipantsTableRow;
