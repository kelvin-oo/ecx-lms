import { currentServerRole } from "@/lib/serverAuthState"
import { redirect } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader";

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
    <div className="flex items-center justify-center min-h-screen w-full">
    <div className="flex flex-col justify-center items-center">
      {/* <h1>Redirecting...</h1> */}
      <ComponentLevelLoader />
    </div>
  </div>
  )
}

export default page