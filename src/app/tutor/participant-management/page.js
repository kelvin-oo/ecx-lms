
// import Image from "next/image"
import SearchFrame from "@/components/admin/SearchFrame"
import ParticipantsTable from "@/components/admin/ParticipantsTable"
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAllTrackParticipants } from "@/actions/participants/participant"
import { currentServerUser } from "@/lib/serverAuthState"
import { countTrackTasks } from "@/actions/track/trackTaskCount"

export default async function ParticipantManagement(){
    const user = await currentServerUser()
    const noOfTasks = await countTrackTasks(user.track)
    const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['trackParticipants'],
    queryFn: async () => {
      const result = await getAllTrackParticipants(user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
    return(
       <main className="w-full flex flex-col gap-10">
        <div>
           <SearchFrame/>
        </div>
        <div className="border-2 border-ecx-colors-black p-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ParticipantsTable noOfTasks={noOfTasks} />
        </HydrationBoundary>
        </div>
       </main>
    )
}