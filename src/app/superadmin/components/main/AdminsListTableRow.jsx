export default function AdminsListTableRow({
  index,
  firstName,
  lastName,
  track,
  isLastPosition = false,
}) {
  return (
    <div
      className={`grid grid-cols-12 lg:grid-cols-10 px-1.5 lg:px-5 py-1.5 lg:py-1.5 gap-5 items-center font-medium text-xs lg:text-sm ${
        isLastPosition
          ? 'bg-ecx-colors-secondary-blue text-white'
          : 'border border-ecx-colors-secondary-blue'
      }`}
    >
      <div className='col-span-1'>
        <div
          className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-[10px] lg:text-xs`}
        >
          {index}
        </div>
      </div>
      <div className='col-span-5 lg:col-span-3 flex lg:items-end lg:justify-start font-semibold truncate'>
        <p>{firstName} {lastName}</p>
      </div>
      <div className='col-span-1 lg:col-span-6 flex lg:items-end lg:justify-self-end gap-x-1.5'>
        <span className='font-semibold'>{track}</span>
      </div>
    </div>
  );
}
