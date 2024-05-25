"use client"
import tableData from '@/sampleData/leaderboard.json'
import { getAllAdminTasks } from '@/actions/task actions/admin tasks';
import { useQuery } from '@tanstack/react-query';
import Image from "next/image";
import { useState } from 'react'
import LeaderboardTableRow from './LeaderboardTableRow';
import LeaderboardTableExpanded from './LeaderboardTableExpanded';
import { getAllParticipants } from '@/actions/participants/participant';

export default function LeaderboardTable({ className = "" }) {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ['leaders'],
    queryFn: getAllParticipants
  })
  // console.log(data)
  const [isTableCollapsed, setTableCollapsed] = useState(true)
  const [leaderboardData, setLeaderboardData] = useState(tableData.filter(
    data => data.track === "Frontend Web Development"
  ))
  const [isShowTracksMenu, setShowTracksMenu] = useState(false)
  const [activeTrack, setActiveTrack] = useState("Track")

  const toggleShowTracksMenu = () => setShowTracksMenu(!isShowTracksMenu)

  const handleTracks = () => {
    if (activeTrack === "Track") {
      setActiveTrack("All Tracks")
      setLeaderboardData(tableData)
    } else {
      setActiveTrack("Track")
      setLeaderboardData(tableData.filter(data => data.track === "Frontend Web Development"))
    }
  }

  const toggleTableCollapse = () => setTableCollapsed(!isTableCollapsed)

  const sortedTableData = leaderboardData.sort((a, b) => b.points - a.points)

  const lastPlace = [sortedTableData[sortedTableData.length - 1]]

  return (
    <div className={`flex flex-col gap-4 relative ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="lg:text-xl font-varela-round tracking-wide">LEADERBOARD</h2>

        <div className="relative w-28 lg:w-40 border border-1.5 border-ecx-colors-secondary-blue font-medium text-sm lg:text-base">
          <button
            onClick={toggleShowTracksMenu}
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
              {activeTrack === "Track" ? "All Tracks" : "Track"}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {sortedTableData
          .slice(0, sortedTableData.length > 2 ? 2 : 1)
          .map(({ ...props }, index) => (
          <LeaderboardTableRow key={index} position={index + 1} {...props} />
        ))}
        {leaderboardData.length > 3 && (
          <div className="w-fit text-2xl lg:text-4xl -rotate-90 translate-x-0.5 lg:translate-x-2.5 -my-3">
            ...
          </div>
        )}
        {sortedTableData.length > 1 && lastPlace.map(({...props}, index) => (
          <LeaderboardTableRow
            key={index}
            position={sortedTableData.length}
            {...props}
            isLastPosition
          />
        ))}
      </div>

      <button onClick={toggleTableCollapse} className="border border-1.5 border-ecx-colors-secondary-blue flex items-center py-0.5 lg:py-1 px-2 lg:px-4 gap-1.5 lg:gap-4 font-medium self-end text-sm lg:text-base">
        See More
      </button>

      {!isTableCollapsed && (
        <LeaderboardTableExpanded
          sortedTableData={sortedTableData}
          toggleTableCollapse={toggleTableCollapse}
          activeTrack={activeTrack}
          handleTracks={handleTracks}
        />
      )}
    </div>
  )
}