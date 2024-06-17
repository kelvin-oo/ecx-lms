
export default function ParticipantsLandingTable({ participants, noOfTasks }) {
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

        {participants?.map(({ firstName, lastName, email, taskScore, taskCompleted }, index) => (
          <div key={index} className="grid grid-cols-5 lg:grid-cols-12 gap-x-10 py-3 text-sm lg:text-base font-light">
            <div className="col-span-1 text-center">
            {index+1}
            </div>
            <div className="col-span-1 lg:col-span-3 truncate">
            {firstName} {lastName}
            </div>
            <div className="col-span-1 lg:col-span-3 truncate">
              {email}
            </div>
            <div className="col-span-1 lg:col-span-2 text-center">
              {taskScore}
            </div>
            <div className="col-span-1 lg:col-span-3 text-center">
              {taskCompleted} / {noOfTasks}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}