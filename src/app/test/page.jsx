import { getAllAdminTasks } from "@/actions/task actions/admin tasks"
import { getLeaderBoard } from "@/actions/leaderboard/leaderboard"
import { getAllParticipants } from "@/actions/participants/participant"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import TestClient from "@/components/TestClient"


const page = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["variants"],
    queryFn: async () => {
      const variants = await getAllParticipants()
      if (variants.error) throw new Error(variants.error)
      if (variants.success) return variants.success
  }
  })
  return (
    <div>
      <h1>hiiiiiiiiiiiiiiiii</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <TestClient className="col-span-1" />
        </HydrationBoundary>
    </div>
  )
}

export default page