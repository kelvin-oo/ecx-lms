import Timer from './Timer';
import Link from 'next/link';

export default function TableRow({ id, title, deadline, grade, status }) {
  function convertToDeadlineFormat(dateString) {
    const date = new Date(dateString);

    // Extract hours, minutes, and seconds
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format the deadline
    return `${hours}:${minutes}:${seconds}`;
  }
  const actualDeadline = convertToDeadlineFormat(deadline);
  console.log(deadline);

  let actualStatus;

  // const currentDate = new Date();
  // if (deadline > currentDate) {
  //   actualStatus = 'EXPIRED';
  // }
  // if (submissions.length === 0) {
  //   actualStatus = 'PENDING';
  // } else {
  //   actualStatus = submissions[0]?.status;
  // }

  return (
    <Link
      href={`/superadmin/tasks/details`}
      className='grid grid-cols-7 gap-x-10 px-3 py-5 transition-colors hover:bg-ecx-colors-secondary-blue/10'
    >
      <div className='col-span-5 lg:col-span-4 text-ecx-colors-secondary-blue line-clamp-2 text-sm lg:text-base'>
        {title}
      </div>
      <div
        className={`text-center col-span-1 hidden lg:block ${
          status === 'Pending'
            ? 'text-[#424242]'
            : status === 'Graded' || status === 'Expired'
            ? 'text-[#F2443F]'
            : 'text-[#00B29A]'
        }`}
      >
        {status}
      </div>
      <Timer initDeadline={actualDeadline} />
      {/* <div className="text-center col-span-1 hidden lg:block">{submissions.length > 0 ? submissions.submissionGrade : '*'} / {taskGrade} </div> */}
      <div className='text-center col-span-1 hidden lg:block'>20</div>
    </Link>
  );
}
