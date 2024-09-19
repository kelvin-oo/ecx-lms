'use client'
import { getAllParticipants } from "@/actions/participants/participant";
import { useQuery } from "@tanstack/react-query";
import { getLeaderBoard } from "@/actions/leaderboard/leaderboard";

function TestComponent() {
  const { data, error, isLoading, isFetched } = useQuery({
    queryFn: async () => getLeaderBoard(),
    queryKey: ["posts"],
  });
 
  // console.log(data)
  
  return <div>TestComponent</div>;
}

export default TestComponent;
