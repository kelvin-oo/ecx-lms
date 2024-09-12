// 'use client';
import AdminTasksTable from '@/components/admin/AdminTasksTable';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import tasks from '@/sampleData/adminTasks.json';

import Link from 'next/link';
// import { useState } from 'react';
import SubmissionsTableMain from '@/components/admin/SubmissionsTableMain';
import { getSingleSubmission2, getTrackSubmissions, getUserSubmissions } from '@/actions/tutor/tutor';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function AdminTasksPage({params}) {
  const id = params.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['sub'],
    queryFn: async () => {
      const result = await getSingleSubmission2(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });

  return (
    <div>
      

        <HydrationBoundary state={dehydrate(queryClient)}>
        <SubmissionsTableMain id={id} />
        </HydrationBoundary>
      </div>
    
  );
}
