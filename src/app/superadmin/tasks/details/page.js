import React from 'react';
import MainTaskTable from './MainTaskTable';
// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from '@tanstack/react-query';
// import { currentServerUser } from '@/lib/serverAuthState';
// import { getUserTasksAndStatuses } from '@/actions/task actions/admin tasks';

export default function page() {
  return (
    <div>
      <MainTaskTable />
    </div>
  );
}
