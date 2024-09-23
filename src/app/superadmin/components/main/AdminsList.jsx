'use client';
import Link from 'next/link';
import tableData from '../../sampleData/adminList.json';
import AdminsListTableRow from './AdminsListTableRow';
import { useQuery } from '@tanstack/react-query';

export default function AdminsList({ className = '', role, route, fetch, action }) {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: [fetch],
    queryFn: async () => {
      const result = await action();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });   
  console.log("🚀 ~ AdminsList ~ data:", data)
  return (
    
    <div className={`flex flex-col gap-4 relative ${className}`}>
      <div className='flex justify-between items-center'>
        <h2 className='lg:text-xl font-varela-round tracking-wide'>{role}</h2>
      </div>
      <div className='flex flex-col gap-2.5'>
        {data.map(({ ...props }, index) => (
            <AdminsListTableRow key={index} index={index + 1} {...props} />
          ))}
      </div>
      <div className='w-full flex justify-end'>
        <button className='bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-10 hover:opacity-90 transition-opacity'>
         <Link href={`/superadmin/${route}`}>See All</Link>
        </button>
      </div>
    </div>
  );
}
