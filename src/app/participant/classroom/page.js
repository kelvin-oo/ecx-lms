"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ClassroomPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("https://chat.whatsapp.com/DV6PNoM5RVj1ICW9hdXW6a")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      Redirecting to classroom...
    </div>
  )
} 

export default ClassroomPage