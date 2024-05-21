import Image from 'next/image';
import authStyles from '@/components/css/authLayout.module.css';

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className='h-16 md:h-20 lg:h-24 p-4 lg:p-8 top-0 z-10 w-full bg-ecx-colors-secondary-blue flex flex-col items-center justify-center'>
        <Image
          src='/ecx-logo-text-white.svg'
          className='scale-90 lg:scale-100'
          alt='logo'
          width={175}
          height={34}
        />
      </header>

      <main className='px-4 pb-10'>
        <Image
          className='fixed top-24 left-10 md:w-[100px] md:top-40 lg:w-[150px] xl:w-[225px] lg:top-96'
          src='/icons/vector-dart.svg'
          alt='logo'
          width={65}
          height={64}
        />

        <div className='flex flex-col items-center gap-8 mt-24 lg:mt-32'>
          <h1 className={authStyles.auth__title}>
            Welcome to the ECX 21 days of code and design
          </h1>
          <div className='w-full flex flex-col gap-5'>{children}</div>
        </div>

        <Image
          className='fixed bottom-16 right-10 -rotate-90 lg:w-[100px] lg:rotate-0'
          src='/icons/vector-swift.svg'
          alt='logo'
          width={70}
          height={50}
        />
      </main>
    </>
  );
};

export default AuthLayout;
