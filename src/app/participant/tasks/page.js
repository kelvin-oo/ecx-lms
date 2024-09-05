import React from 'react'
import MainTaskTable from './MainTaskTable'
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"
import { currentServerUser } from '@/lib/serverAuthState';
import { getUserTasksAndStatuses } from '@/actions/task actions/admin tasks';

export default async function page() {

const user = await currentServerUser()
const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const result = await getUserTasksAndStatuses(user.id,user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTaskTable />
      </HydrationBoundary>
    </div>
  )
}
