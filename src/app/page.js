import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';

export default function Home() {
  return (
    <AuthLayout>
      <div className='grid grid-cols-2 px-4 w-full max-w-[400px] lg:max-w-[550px] mx-auto gap-6 lg:gap-16 text-sm lg:text-lg font-varela-round [&>*]:col-span-1 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:h-10 [&>*]:lg:h-14 '>
        <Link
          href='/auth/signup'
          className='bg-ecx-colors-secondary-blue text-white'
        >
          Sign up
        </Link>
        <Link
          href='/auth/login'
          className='border-[3px] border-ecx-colors-secondary-blue text-ecx-colors-secondary-blue'
        >
          Login
        </Link>
      </div>
    </AuthLayout>
  );
}
