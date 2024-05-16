
import { currentServerUser } from '@/lib/serverAuthState'
async function page() {
    const user = await currentServerUser()
  return (
    <div>
        <h1>first name {user?.firstName}</h1>
        <h1>last name {user?.lastName}</h1>
        <h1>username {user?.userName}</h1>
        <h1>role {user?.role}</h1>
        <h1>track {user?.track}</h1>
        <h1>email {user?.email}</h1>
        <h1>id {user?.id}</h1>
    </div>
  )
}

export default page