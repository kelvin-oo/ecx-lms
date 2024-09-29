"use client";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader";
import { IoClose } from "react-icons/io5";

export default function AdminTasksTable({ tasksArr, minimized = false }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [activeItemId, setActiveItemId] = useState(null);

  const toggleActions = (itemId) => {
    setActiveItemId(activeItemId === itemId ? null : itemId);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    // console.log("clicked delete");
    try {
      const res = await fetch(`/api/admin/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (res.ok) {
        setLoading(false);
        toast.success("task deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.refresh("/tutor/all-tasks");
        console.log("task deleted successfully");
      } else {
        setLoading(false);
        toast.error("Error deleleting task", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        throw new Error("Trouble Deleting");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-1 flex flex-col gap-6 lg:gap-8 xl:gap-10 bg-white border-[1.5px] border-[#B0AFAF] py-6 px-5 lg:px-8">
      <div className="flex justify-between">
        <h1 className="lg:text-xl font-varela-round tracking-wide truncate">
          RECENT TASKS
        </h1>
        {minimized && (
          <Image
            alt="schedule"
            src="/icons/schedule.svg"
            className="w-5 h-5 lg:w-6 lg:h-6"
            width={24}
            height={24}
          />
        )}
      </div>

      <div className={!minimized && "divide-y divide-black [&>*]:py-3.5"}>
        <div className="grid grid-cols-11 gap-x-10 py-2 lg:text-lg font-varela-round font-bold">
          <div
            className={`${minimized ? "col-span-2" : "col-span-1"} text-center`}
          >
            ID
          </div>
          <div className="col-span-3">Title</div>
          <div className="col-span-3 text-center">Deadline</div>
          <div className="col-span-3 text-center truncate">Task Grade</div>
        </div>

        {tasksArr?.map(({ id, title, deadline, taskGrade }, index) => (
          <div
            key={index}
            className={`grid grid-cols-11 gap-x-10 py-1.5 text-sm lg:text-base font-light`}
          >
            <div
              className={`${
                minimized ? "col-span-2" : "col-span-1"
              } text-center`}
            >
              {index + 1}
            </div>
            <div className="col-span-3 truncate">{title}</div>
            <div className="col-span-3 text-center">
              {moment(deadline).format("YYYY/MM/DD")}
            </div>
            <div className="col-span-3 text-center">{taskGrade}</div>
            {!minimized && (
              <div
                
                className="col-span-1 font-medium relative"
              >
                <p onClick={() => toggleActions(id)} className="rotate-90 absolute right-1/2 cursor-pointer">...</p>
                {activeItemId === id && (
                  <div className="flex flex-col gap-3 absolute bg-white shadow-lg left-[-4rem] z-50 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm">
                    <h1 className="flex justify-center align-middle cursor-pointer" onClick={() => toggleActions(id)}><IoClose /></h1>
                    <Link href={`/tutor/all-tasks/edit/${id}`}>
                      <button className="outline-none">Edit Task</button>
                    </Link>
                    <hr className="border-grey" />
                    <button
                      className="outline-none flex justify-center align-middle"
                      onClick={() => handleDelete(id)}
                    >
                      {loading ? (
                        <ComponentLevelLoader color={"#000000"} />
                      ) : (
                        "Delete Task"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
