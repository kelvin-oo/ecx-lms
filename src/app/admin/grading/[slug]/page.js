"use client"
// import Link from "next/link"
import participantData from "../../../../sampleData/participants.json"
import { useRouter } from "next/navigation"

export default function Grading({params}){
    // const {
    //    name,
    //    task
    //   } = participantData.find(data => data.id == params.slug);

    const name = 'lean'
    const task = 'leankk'
       
      const router = useRouter();
    return(
        <main className="grid font-varela-round text-[#424242] gap-y-6">
            <div className="text-base">
                <button onClick={() => {router.back()}} className="text-[#AAAAAA] font-bold outline-none">{name}&nbsp;</button>
                <span className="text-ecx-colors-secondary-blue font-bold">&#12296;Grading Rubic</span>
            </div>
            <div className=" grid gap-y-6 text-base lg:text-lg border-2 border-black px-6 py-10">
                <h3 className="text-ecx-colors-secondary-blue font-bold">Participant: <span className=" font-light">{name}</span></h3>
                <h3 className="text-ecx-colors-secondary-blue font-bold">Task: <span className="font-light">{task}</span></h3>
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Grading Rubic</label>
                <div className="flex text-[#424242] border-2 border-[#424242] px-10 py-4 ">
                <input type="text" className="w-full outline-none bg-transparent "/>
                <span className="flex-end text-xs lg:text-sm">Role</span>
                </div>
                </div>
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Comments</label>
                <input className="w-full outline-none bg-transparent border-2 border-[#424242] p-4"/>
                </div>
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Grade:</label>
                <input type="text" className="w-full outline-none bg-transparent border-2 border-[#424242] p-4"/>
                </div>
                <button className="w-full bg-ecx-colors-secondary-blue p-4 text-white grid gap-y-3 hover">Submit</button>
            </div>
        </main>
    )
}