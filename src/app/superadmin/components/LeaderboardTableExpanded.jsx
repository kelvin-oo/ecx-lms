"use client"
import Image from "next/image";
import styles from '@/components/css/leaderboardTable.module.css'
import LeaderboardTableRow from "./LeaderboardTableRow";
import { useEffect, useRef, useState } from "react";

export default function LeaderboardTableExpanded({
  sortedTableData,
  toggleTableCollapse,
  activeTrack,
  handleTracks
}) {
  const elementRef = useRef(null);

  const [isShowTracksMenu, setShowTracksMenu] = useState(false)
  const toggleShowTracksMenu = () => setShowTracksMenu(!isShowTracksMenu)

  useEffect(() => {
    const element = elementRef.current;

    const handleMount = () => {
      if (element) {
        document.body.style.overflow = 'hidden';
      }
    };

    const handleUnmount = () => {
      if (element) {
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleMount);

    handleMount();

    return () => {
      window.removeEventListener('resize', handleMount);
      handleUnmount();
    };
  }, []);

  return (
    <div ref={elementRef} className='fixed bg-slate-400/30 w-screen h-screen left-0 top-0 backdrop-blur-sm z-10 overflow-hidden flex items-center justify-center'>
      <div className='shadow-2xl ps-4 lg:ps-16 pe-1.5 lg:pe-8 py-4 lg:py-12 mx-4 lg:mx-0 lg:w-2/3 max-h-[70%] overflow-hidden bg-white z-20 flex flex-col gap-4 lg:gap-10'>
        <div className="flex justify-between items-center pe-2.5 lg:pe-8">
          <h2 className="md:text-lg lg:text-xl font-varela-round tracking-wide">LEADERBOARD</h2>
          
          <div className="relative w-28 lg:w-40 border border-1.5 border-ecx-colors-secondary-blue font-medium text-sm lg:text-base">
            <button
              onClick={() => setShowTracksMenu(!isShowTracksMenu)}
              className="relative w-full flex items-center justify-between py-0.5 lg:py-1 px-2 lg:px-4 gap-1.5 lg:gap-4 font-medium text-sm lg:text-base"
            >
              <span>{activeTrack}</span>
              <Image
                alt="arrow"
                src="/icons/chevron-down-second-blue.svg"
                className='w-4 h-4 lg:w-5 lg:h-5'
                width={20}
                height={20}
              />
            </button>
            {isShowTracksMenu && (
              <button
                onClick={() => { handleTracks(); toggleShowTracksMenu() }}
                className='absolute w-[calc(100%+2px)] bg-white border border-1.5 border-ecx-colors-secondary-blue top-full -right-[1px] py-1 lg:py-1.5 px-2 lg:px-5 text-start'
              >
               {activeTrack === "My Track" ? "All Tracks" : "My Track"}
              </button>
            )}
          </div>
        </div>

        <div className={`${styles.table} flex flex-col gap-3 lg:gap-4 overflow-x-hidden overflow-y-scroll scroll-smooth pe-1.5 lg:pe-6`}>
          {sortedTableData.map(({...props}, index) => (
            <LeaderboardTableRow key={index} position={index + 1} {...props} />
          ))}
        </div>

        <button onClick={toggleTableCollapse} className="border border-1.5 border-ecx-colors-secondary-blue flex items-center py-0.5 lg:py-1 px-2 lg:px-4 gap-1.5 lg:gap-4 me-3 lg:me-8 font-medium self-end text-sm lg:text-base">
          Close Table
        </button>
      </div>
    </div>
  )
}