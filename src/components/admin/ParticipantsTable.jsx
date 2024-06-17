"use client";
import ParticipantsTableRow from "./ParticipantsTableRow";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllTrackParticipants } from "@/actions/participants/participant";
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import { useEffect, useState } from "react";

export default function ParticipantsTableOptional({ noOfTasks }) {
  const user = useCurrentClientUser();
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["trackParticipants"],
    queryFn: async () => {
      const result = await getAllTrackParticipants(user.track);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const [participantsData, setParticipantsData] = useState(data);
  useEffect(() => {
    if (searchValue && searchValue != 'undefined') {
      const filteredData = data.filter(
        (participant) =>
          participant.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          participant.lastName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          participant.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setParticipantsData(filteredData);
    } else {
      setParticipantsData(data); // reset to original data when searchValue is empty
    }
  }, [searchValue, data]);

  return (
    <div className="divide-y text-[#424242] divide-black font-varela-round">
      <div className="grid grid-cols-12 gap-x-10 px-3 py-3 text-base lg:text-lg whitespace-nowrap">
        <div className="text-black">ID</div>
        <div className="text-black col-span-2">Name</div>
        <div className="col-span-3 text-black">Email</div>
        <div className="text-center col-span-2 text-black">Total Score</div>
        <div className="text-center col-span-2 text-black">Task Completed</div>
        <div className="text-center col-span-2 text-black">Action</div>
      </div>

      {participantsData?.map(({ ...props }, index) => (
        <ParticipantsTableRow
          key={index}
          {...props}
          index={index}
          noOfTasks={noOfTasks}
        />
      ))}
    </div>
  );
}
