export default function LeaderboardTableRow({
  position,
  firstName,
  lastName,
  track,
  points,
  isLastPosition = false
}) {
  return (
    <div className={`grid grid-cols-12 lg:grid-cols-10 px-1.5 lg:px-5 py-1.5 lg:py-1.5 gap-5 items-center font-medium text-xs lg:text-sm ${isLastPosition ? "bg-ecx-colors-secondary-blue text-white" : "border border-ecx-colors-secondary-blue"}`}>
      <div className="col-span-1">
        <div className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-[10px] lg:text-xs ${isLastPosition ? "bg-white text-ecx-colors-secondary-blue" : "bg-ecx-colors-secondary-blue text-white"}`}>
          {position}
        </div>
      </div>
      <div className="col-span-5 lg:col-span-3 font-semibold truncate">
        {firstName} {lastName}
      </div>
      <div className="col-span-5 lg:col-span-3 font-light truncate">
        {track}
      </div>
      <div className="col-span-1 lg:col-span-3 flex items-end justify-end gap-x-1.5">
        <span className="font-semibold">{points}</span>
        <span className="font-normal text-xs hidden lg:block">points</span>
      </div>
    </div>
  )
}