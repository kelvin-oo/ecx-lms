import Timer from "./Timer";
import Link from "next/link";
import CountdownTimer from "./Timer";

export default function TableRow({
  id,
  title,
  deadline,
  taskGrade,
  submissions,
}) {
  function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  


  let actualStatus;

  const currentDate = new Date();
  if (deadline > currentDate) {
    actualStatus = 'EXPIRED'
  }
  if (submissions.length === 0) {
    actualStatus = 'PENDING'
  } else {
    actualStatus = submissions[0]?.status;
  }

  return (
    <Link
      href={`/participant/description/${id}`}
      className="grid grid-cols-7 gap-x-10 px-3 py-5 transition-colors hover:bg-ecx-colors-secondary-blue/10"
    >
      <div className="col-span-5 lg:col-span-4 text-ecx-colors-secondary-blue line-clamp-2 text-sm lg:text-base">
        {title}
      </div>
      <div
        className="text-center col-span-1 hidden lg:block"
        style={{
          color:
          actualStatus === "PENDING"
              ? "#424242"
              : actualStatus === "GRADED" 
              ? "#00B29A"
              : actualStatus === "EXPIRED" 
              ? '#F2443F'
              : "#00B29A",
        }}
      >
        {actualStatus}
      </div>
      <CountdownTimer date={convertDateFormat(deadline)} />
      <div className="text-center col-span-1 hidden lg:block">{submissions.length > 0 ? submissions[0].submissionGrade : '*'} / {taskGrade} </div>
    </Link>
  );
}
