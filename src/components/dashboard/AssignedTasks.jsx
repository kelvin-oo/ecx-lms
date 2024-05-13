import Image from "next/image";

export default function AssignedTasks() {
  const taskProgress = "60%"

  return (
    <div className="col-span-1">
      <div className="flex justify-between gap-2">
        <h1 className="lg:text-xl font-varela-round tracking-wide truncate">ASSIGNED TASK</h1>
        <Image
          alt="schedule"
          src="/icons/schedule.svg"
          className="w-5 h-5 lg:w-6 lg:h-6"
          width={24}
          height={24}
        />
      </div>
      <div className="flex justify-center items-baseline gap-2 my-8 lg:my-12">
        <span className="font-bold text-[32px] lg:text-[42px]">17/32</span>
        <span className="text-[10px] lg:text-xs">POINTS</span>
      </div>
      <div className='bg-ecx-colors-dart relative h-2 lg:h-2.5 rounded-2xl'>
        <div
          className='bg-ecx-colors-secondary-blue absolute top-0 left-0 h-full rounded-2xl'
          style={{
            width: taskProgress
          }}
        />
        <span
          className='bg-ecx-colors-secondary-blue absolute -translate-x-1/2 bottom-full mb-1.5 lg:mb-2 rounded-md p-[5px] lg:p-1.5 text-[8px] lg:text-[10px] text-white'
          style={{
            left: taskProgress
          }}
        >
          <span className='bg-ecx-colors-secondary-blue absolute bottom-[-3px] lg:bottom-[-4px] left-1/2 h-2 w-2 lg:h-2.5 lg:w-2.5 -translate-x-1/2 rotate-45 rounded-sm' />
          {taskProgress}
        </span>
      </div>
      <p className="mt-4 text-[10px] lg:text-xs tracking-wide">COMPLETED TASKS</p>
    </div>
  )
}