'use client'
import { useCurrentClientUser } from "@/hooks/use-current-client-user"

import { LogoutButton } from "@/components/auth/logout-button"
function page() {
    const user = useCurrentClientUser()
  return (
    <div>
        <h1>first name {user?.firstName}</h1>
        <h1>last name {user?.lastName}</h1>
        <h1>username {user?.userName}</h1>
        <h1>role {user?.role}</h1>
        <h1>track {user?.track}</h1>
        <h1>id {user?.id}</h1>
        <LogoutButton>
        <h1>Log out</h1>
       </LogoutButton>
    </div>
  )
}

export default page