// // import { getAllAdminTasks } from "@/actions/task actions/admin tasks"
// // import { getLeaderBoard } from "@/actions/leaderboard/leaderboard"
// // import { getAllParticipants } from "@/actions/participants/participant"
// // import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
// // import TestClient from "@/components/TestClient"


// // const page = async () => {
// //   const queryClient = new QueryClient()
// //   await queryClient.prefetchQuery({
// //     queryKey: ["variants"],
// //     queryFn: async () => {
// //       const variants = await getAllParticipants()
// //       if (variants.error) throw new Error(variants.error)
// //       if (variants.success) return variants.success
// //   }
// //   })
// //   return (
// //     <div>
// //       <h1>hiiiiiiiiiiiiiiiii</h1>
// //       <HydrationBoundary state={dehydrate(queryClient)}>
// //       <TestClient className="col-span-1" />
// //         </HydrationBoundary>
// //     </div>
// //   )
// // }

// // export default page
// // 'use client'
// // import { getLeaderBoard } from "@/actions/leaderboard/leaderboard"
// // import { getAllParticipants } from "@/actions/participants/participant"
// // import { useQuery } from "@tanstack/react-query";

// // function page() {
// //   const { data: leaders, error: leadersError, isLoading: isLeadersLoading, isFetched: isLeadersFetched } = useQuery({
// //     queryKey: ['leaders'],
// //     queryFn: async () => {
// //       const result = await getLeaderBoard();
// //       if (result.error) {
// //         throw new Error(result.error);
// //       }
// //       return result.success.json();
// //     },
// //   });
  
// //   if (isLeadersLoading) {
// //     console.log('Loading loaders...');
// //   } else if (isLeadersFetched) {
// //     console.log(leaders, leadersError);
// //   }
  

// //   return (
// //     <div>page</div>
// //   )
// // }

// // export default page

// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query"
// import TestComponent from "./TestComponent"
// import { getLeaderBoard } from "@/actions/leaderboard/leaderboard"
// import { getAllParticipants } from "@/actions/participants/participant"

// export default async function Home() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery({
//     queryKey: ["posts"],
//     queryFn: getLeaderBoard,
//   })
//   return (
//     <div>
//        <HydrationBoundary state={dehydrate(queryClient)}>
//         <TestComponent />
//       </HydrationBoundary>
//     </div>
//   )
// }

import { getUserGradeSummary } from "@/actions/participants/participant"
import { currentServerUser } from "@/lib/serverAuthState"

async function page() {
  const user = await currentServerUser()
  const response = getUserGradeSummary(user.id, user.track)
  const data = await response.json
  // console.log("🚀 ~ page ~ data:", data)
  return (
    <div>page</div>
  )
}

export default page

