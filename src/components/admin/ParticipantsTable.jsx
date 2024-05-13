import participants from "@/sampleData/participants.json"
import participantData from "@/sampleData/participants.json"
import ParticipantsTableRow from "./ParticipantsTableRow";

export default function ParticipantsTable() {
  return (
    <div className="col-span-2">
      <h2 className="col-span-5 lg:col-span-4 py-3 lg:text-xl font-varela-round">
        List of Participants
      </h2>

      <div className="divide-y divide-black">
        <div className="grid grid-cols-5 lg:grid-cols-12 gap-x-10 py-3 lg:text-base font-varela-round font-bold">
          <div className="col-span-1 text-center">
            ID
          </div>
          <div className="col-span-1 lg:col-span-3">
            Name
          </div>
          <div className="col-span-1 lg:col-span-3">
            Email
          </div>
          <div className="col-span-1 lg:col-span-2 text-center truncate">
            Task Score
          </div>
          <div className="col-span-1 lg:col-span-3 text-center truncate">
            Tasks Completed
          </div>
        </div>

        {participants[0].map(({ id, name, email, taskScore, tasksCompleted }, index) => (
          <div key={index} className="grid grid-cols-5 lg:grid-cols-12 gap-x-10 py-3 text-sm lg:text-base font-light">
            <div className="col-span-1 text-center">
              {id}
            </div>
            <div className="col-span-1 lg:col-span-3 truncate">
              {name}
            </div>
            <div className="col-span-1 lg:col-span-3 truncate">
              {email}
            </div>
            <div className="col-span-1 lg:col-span-2 text-center">
              {taskScore}
            </div>
            <div className="col-span-1 lg:col-span-3 text-center">
              {tasksCompleted}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ParticipantsTableOptional = () => {
   return(
    <div className="divide-y text-[#424242] divide-black font-varela-round">
        <div className="grid grid-cols-12 gap-x-10 px-3 py-3 text-base lg:text-lg whitespace-nowrap">
           <div className="text-black">ID</div>
           <div className="text-black col-span-2">Name</div>
           <div className="col-span-3 text-black">Email</div>
           <div className="text-center col-span-2 text-black">Total Score</div>
           <div className="text-center col-span-2 text-black">Task Completed</div>
           <div className="text-center col-span-2 text-black">Action</div>
        </div>
        
        {participantData[1].map(({...props}, index) => (
          <ParticipantsTableRow key={index} {...props}/>
        ))          
        }
    </div>
   )
}

//export default ParticipantsTable;
