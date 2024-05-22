'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/components/css/sidebar.module.css';
import { LogoutButton } from '../auth/logout-button';

const Sidebar = ({ handleShowSidebar }) => {
  const [isShowLogoutModal, setShowLogoutModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const currentUserRole = pathname.split('/')[1];

  const isAdmin =
    (pathname.split('/')[1] === 'tutor') | (pathname.split('/')[1] === 'admin');

  const sidebarLinks__user = [
    { name: 'dashboard', href: '/participant', icon: 'dashboard' },
    { name: 'tasks', href: '/participant/tasks', icon: 'tasks' },
    { name: 'classroom', href: '/participant/classroom', icon: 'classroom' },
  ];

  const sidebarLinks__admin = [
    { name: 'dashboard', href: `/${currentUserRole}`, icon: 'dashboard' },
    {
      name: 'tasks management',
      href: `/${currentUserRole}/tasks`,
      icon: 'tasks',
    },
    {
      name: 'participants management',
      href: `/${currentUserRole}/participant-management`,
      icon: 'classroom',
    },
  ];

  const handleShowLogoutModal = () => setShowLogoutModal(!isShowLogoutModal);

  const handleLogout = () => {
    console.log('trying to logout');
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (scrollY > 100) {
        setShowLogoutModal(false);
      }
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <nav className={styles.sidebar}>
      <div className='flex flex-col gap-5 lg:gap-8'>
        {isAdmin
          ? sidebarLinks__admin.map(({ name, href, icon }, index) => {
              const isActiveLink = pathname == href;

              return (
                <Link
                  key={index}
                  href={href}
                  onClick={handleShowSidebar && handleShowSidebar}
                  className={`${styles.sidebarLink} ${
                    isActiveLink && styles.sidebarLinkActive
                  }`}
                >
                  <Image
                    alt='dashboard'
                    src={
                      isActiveLink
                        ? `/icons/${icon}-light.svg`
                        : `/icons/${icon}-dark.svg`
                    }
                    className={styles.sidebarLinkImg}
                    width={24}
                    height={24}
                  />
                  <span>{name.toUpperCase()}</span>
                </Link>
              );
            })
          : sidebarLinks__user.map(({ name, href, icon }, index) => {
              const isActiveLink = pathname == href;

              return (
                <Link
                  key={index}
                  href={href}
                  onClick={handleShowSidebar && handleShowSidebar}
                  className={`${styles.sidebarLink} ${
                    isActiveLink && styles.sidebarLinkActive
                  }`}
                >
                  <Image
                    alt='dashboard'
                    src={
                      isActiveLink
                        ? `/icons/${icon}-light.svg`
                        : `/icons/${icon}-dark.svg`
                    }
                    className={styles.sidebarLinkImg}
                    width={24}
                    height={24}
                  />
                  <span>{name.toUpperCase()}</span>
                </Link>
              );
            })}
      </div>

      <div className='flex flex-col gap-3.5 relative'>
        <hr className='border-black' />
        <button
          onClick={handleShowLogoutModal}
          className='bg-ecx-colors-ruby text-white font-semibold py-2.5 flex justify-center gap-3'
        >
          <Image
            alt='dashboard'
            src='/icons/logout.svg'
            width={14}
            height={14}
          />
          <span>LOGOUT</span>
        </button>
        {isShowLogoutModal && (
          <div className={styles.logoutModal}>
            <div className='text-center col-span-2'>ARE YOU SURE?</div>
            <LogoutButton>
              <button
                onClick={handleLogout}
                className={`${styles.modalBtn} ${styles.modalBtnDark}`}
              >
                LOGOUT
              </button>
            </LogoutButton>

            <button onClick={handleShowLogoutModal} className={styles.modalBtn}>
              CANCEL
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
