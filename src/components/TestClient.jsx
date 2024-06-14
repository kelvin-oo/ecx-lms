'use client'

import { getAllParticipants } from "@/actions/participants/participant"
import { useQuery } from "@tanstack/react-query"

function TestClient() {
    const { data, error, isLoading, isFetched } = useQuery({
        queryKey: ['variants'],
        queryFn: async () => {
            const variants = await getAllParticipants()
            if (variants.error) throw new Error(variants.error)
            if (variants.success) return variants.success
        }
      })
      console.log(data)
    //   if (error) return <div>{error}</div>
      if(data)
  return (
    <div>{
        data?.map((dat) => {
            return <h1 key={dat.id}>{dat.email}</h1>
        })
        }</div>
  )
}

export default TestClient