'use client'
import Image from "next/image";
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import { useQuery } from "@tanstack/react-query";
import { getUserGradeSummary } from "@/actions/participants/participant";

export default function AssignedTasks() {
  const user = useCurrentClientUser()
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["userGrade"],
    queryFn: async () => {
      const result = await getUserGradeSummary(user.id,user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success
    },
  }); 

  const calculateTaskProgress = ( totalSubmissionGrade, totalTaskGrade) => {
    // Ensure we don't divide by zero
    if (totalSubmissionGrade === 0) {
      return 0;
    }
  
    // Calculate the progress percentage
    const progressPercentage = (totalSubmissionGrade / totalTaskGrade) * 100;
  
    // Round to two decimal places and ensure it doesn't exceed 100%
    return Math.min(Math.round(progressPercentage * 100) / 100, 100);
  };
  const taskProgress = calculateTaskProgress(data.totalSubmissionGrade,data.totalTaskGrade, )
  console.log("🚀 ~ AssignedTasks ~ data:", taskProgress)

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
        <span className="font-bold text-[32px] lg:text-[42px]">{data.totalSubmissionGrade}/{data.totalTaskGrade}</span>
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
          {taskProgress}%
        </span>
      </div>
      <p className="mt-4 text-[10px] lg:text-xs tracking-wide">COMPLETED TASKS</p>
    </div>
  )
}