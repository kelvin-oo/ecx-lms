import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { RoleGate } from '@/components/role-gate-server';
import { UserRole } from "@prisma/client";

export default function AdminLayout({ children }) {
  return (
    // <RoleGate allowedRole={UserRole.ADMIN}>
      <main className='relative'>
        <Header />
        <span className='hidden lg:block'>
          <Sidebar />
        </span>

        <main className='lg:ms-48 pt-6 lg:pt-12 px-4 lg:px-20 pb-10'>
          {children}
        </main>
      </main>
    // </RoleGate>

  );
}
