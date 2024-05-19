'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const currentUserRole = pathname.split('/')[1];

  const [isShowDropdown, setShowDropdown] = useState(false);
  const [isShowSidebar, setShowSidebar] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [screenWidth, setScreenWidth] = useState('');

  const handleShowDropdown = () => setShowDropdown(!isShowDropdown);
  const handleShowSidebar = () => setShowSidebar(!isShowSidebar);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (scrollY > 60) {
        setShowDropdown(false);
      }
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <header className='h-16 md:h-20 lg:h-24 px-4 lg:px-8 w-full sticky top-0 z-10 bg-ecx-colors-secondary-blue text-white grid grid-cols-6 lg:flex items-center lg:justify-between'>
      {isShowSidebar && screenWidth < 1024 && (
        <Sidebar handleShowSidebar={handleShowSidebar} />
      )}

      <button
        onClick={handleShowSidebar}
        className='lg:hidden col-span-1 flex items-center'
      >
        <Image
          src='/icons/menu.svg'
          alt='logo'
          width={25}
          height={25}
          priority
        />
      </button>

      <Link
        href={`/${currentUserRole}`}
        className='col-span-4 flex justify-center lg:hidden'
      >
        <Image
          src='/ecx-logo-no-text.svg'
          className='w-auto h-auto'
          alt='logo'
          width={80}
          height={28}
          priority
        />
      </Link>

      <Link
        href={`/${currentUserRole}`}
        className='hidden lg:block w-auto h-auto'
      >
        <Image
          src='/ecx-logo-text-white.svg'
          alt='logo'
          width={175}
          height={34}
          priority
        />
      </Link>

      <div className='flex items-center gap-3 lg:gap-4 col-span-1 justify-end'>
        <span className='hidden lg:block'>
          <b>Track: </b>Front end Web development
        </span>
        <Image
          src='/icons/bell-white.svg'
          alt='bell'
          className='w-4 h-4 lg:w-5 lg:h-5'
          width={20}
          height={20}
        />
        <button
          className='flex items-center gap-2 transition-colors hover:bg-ecx-colors-dart/10 rounded-3xl'
          onClick={handleShowDropdown}
        >
          <Image
            src='/icons/user-light.svg'
            alt='user'
            className='w-8 h-w-8 lg:w-[44px] lg:h-[44px] rounded-full'
            width={44}
            height={44}
          />

          <Image
            src='/icons/chevron-down-white.svg'
            alt='arrow'
            width={24}
            height={24}
          />
        </button>
      </div>

      {isShowDropdown && (
        <div className='bg-white z-10 shadow-md text-xs lg:text-sm flex py-1.5 lg:py-4 px-2.5 lg:px-6 absolute right-4 lg:right-8 top-full flex-col divide-y divide-ecx-colors-black [&>*]:py-2.5 [&>*]:flex [&>*]:items-center [&>*]:gap-2 text-black'>
          <Link
            onClick={handleShowDropdown}
            href={`/${currentUserRole}/profile`}
          >
            <Image
              src='/icons/menu-profile.svg'
              className='w-5 h-5 lg:w-6 lg:h-6'
              alt='profile'
              width={24}
              height={24}
            />
            <span>View profile</span>
          </Link>
          <Link
            onClick={handleShowDropdown}
            href={`/${currentUserRole}/profile`}
          >
            <Image
              src='/icons/menu-edit.svg'
              className='w-5 h-5 lg:w-6 lg:h-6'
              alt='edit'
              width={24}
              height={24}
            />
            <span>Edit profile</span>
          </Link>
          <Link
            onClick={handleShowDropdown}
            href={`/${currentUserRole}/profile`}
          >
            <Image
              src='/icons/menu-password.svg'
              className='w-5 h-5 lg:w-6 lg:h-6'
              alt='password'
              width={24}
              height={24}
            />
            <span>Change password</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
