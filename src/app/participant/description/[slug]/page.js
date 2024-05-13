"use client"
import Link from "next/link"
import Image from "next/image"
import Timer from "@/components/common/Timer"
import tasks from "@/sampleData/tasks.json"


export default function SubmissionPage({ params }) {
  const {
    title,
    description,
    submissionDetails,
    status,
    deadline,
    grade
  } = tasks.find(task => task.id == params.slug)

  return(
    <div className="flex flex-col gap-6 lg:gap-10">
      <div className="flex gap-5 text-xs lg:text-base">
        <Link href="/user/" className="transition-opacity hover:opacity-50">Dashboard</Link>
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={12}
          height={5}
        />
        <Link href="/user/tasks" className="transition-opacity hover:opacity-50">Tasks</Link>
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={12}
          height={5}
        />
        <Link href="" className="transition-opacity hover:opacity-50">Description</Link>
      </div>

      <div className="grid grid-cols-6 gap-12 lg:gap-20 xl:gap-10">
        <div className="col-span-6 lg:col-span-3 xl:col-span-4 order-last lg:order-1 flex flex-col gap-4 lg:gap-8 font-varela-round">
          <h1 className="text-[18px] lg:text-2xl xl:text-3xl">{title}</h1>
          <p className="text-sm lg:text-lg xl:text-xl">{description}</p>
          <h1 className="lg:text-xl xl:text-2xl mt-5">Submission Details</h1>
          <p className="text-sm lg:text-lg xl:text-xl">{submissionDetails}</p>
          <input
            type="text"
            className="border-2 border-ecx-colors-secondary-blue px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 xl:py-5 placeholder-black text-sm font-varela-round outline-none"
            placeholder="Paste URL link"
          />
          <div className="grid grid-cols-2 w-11/12 xl:w-4/5 h-10 lg:h-14 mx-auto gap-6 xl:gap-16 justify-center text-sm lg:text-lg">
            <button className="bg-ecx-colors-secondary-blue text-white">Submit</button>
            <button className="border-2 border-ecx-colors-secondary-blue text-ecx-colors-secondary-blue">Edit Link</button>
          </div>
        </div>

        <div className="col-span-6 lg:col-span-3 xl:col-span-2 lg:order-2 border lg:border-2 border-ecx-colors-secondary-blue h-fit px-5 lg:px-10 xl:px-12 py-4 lg:py-6 flex justify-between lg:flex-col lg:gap-6 text-lg lg:text-xl bg-white shadow-[4px_4px_rgba(39,46,75,1)] lg:shadow-[7px_7px_rgba(39,46,75,1)] text-center lg:text-start">
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Status</div>
            <div className="font-light text-sm lg:text-xl">{status}</div>
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Deadline</div>
            <Timer className="!text-center lg:!text-start font-light text-sm lg:text-xl" initDeadline={deadline} />
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Grade</div>
            <div className="font-light text-sm lg:text-xl">{grade.split("/")[1]} <span className="text-xs lg:text-base">points</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
