"use client"
// import Image from "next/image"
import SearchFrame from "@/components/admin/SearchFrame"
import ParticipantsTable from "@/components/admin/ParticipantsTable"

export default function ParticipantManagement(){
    return(
       <main className="w-full flex flex-col gap-10">
        <div>
           <SearchFrame/>
        </div>
        <div className="border-2 border-ecx-colors-black p-5">
            <ParticipantsTable/>
        </div>
       </main>
    )
}