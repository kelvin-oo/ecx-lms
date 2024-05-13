import Timer from "./Timer";
import Link from "next/link"

export default function TableRow({
  id,
  title,
  status,
  deadline,
  grade
}) {
  return (
    <Link
      href={`/user/description/${id}`}
      className="grid grid-cols-7 gap-x-10 px-3 py-5 transition-colors hover:bg-ecx-colors-secondary-blue/10"
    >
      <div className="col-span-5 lg:col-span-4 text-ecx-colors-secondary-blue line-clamp-2 text-sm lg:text-base">
        {title}
      </div>
      <div
        className="text-center col-span-1 hidden lg:block"
        style={{
          color: status === "Pending" ? "#424242"
            : status === "Graded" || status === "Expired" ? "#F2443F"
            : "#00B29A"
        }}
      >
        {status}
      </div>
      <Timer initDeadline={deadline} />
      <div className="text-center col-span-1 hidden lg:block">
        {grade}
      </div>
    </Link>
  )
}