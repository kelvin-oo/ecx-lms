import { currentServerRole } from "@/lib/serverAuthState"
import { redirect } from "next/navigation";

async function page() {
  const role = await currentServerRole()
  if (role === "PARTICIPANT") {
    return redirect("/participant");
  }

  if (role === "ADMIN") {
    return redirect("/admin");
  }
  if (role === "TUTOR") {
    return redirect("/tutor");
  }
  return (
    <div>...</div>
  )
}

export default page