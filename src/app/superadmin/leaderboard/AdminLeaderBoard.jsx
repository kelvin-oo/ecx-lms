"use client";
import tableData from "../sampleData/tasks.json";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAdminLeaderBoard } from "@/actions/superAdmin/super";

export default function AdminLeaderBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All tracks");
  const dropdownRef = useRef(null);
  const options = [
    "All tracks",
    "Frontend",
    "Backend",
    "Data Science",
    "Data Analysis",
    "UI/UX",
    "DSA",
  ];

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: [`leaderboard`],
    queryFn: async () => {
      const result = await getAdminLeaderBoard();
      if (result.error) {
        throw new Error(result.error);
      }

      return result.success;
    },
  });
  const [leaderboardData, setLeaderboardData] = useState(data);
  const handleTracks = () => {
    if (selectedOption === "All tracks") {
      console.log("All tracks");
      setLeaderboardData(data);
    }
    if (selectedOption === "Frontend") {
      console.log("Frontend");
      setLeaderboardData(
        data.filter((data) => data.track === `Frontend development`)
      );
    }
    if (selectedOption === "Backend") {
      console.log("Backend");
      setLeaderboardData(
        data.filter((data) => data.track === `Backend development`)
      );
    }
    if (selectedOption === "Python") {
      console.log("Backend");
      setLeaderboardData(data.filter((data) => data.track === `Python`));
    }
    if (selectedOption === "Data Science") {
      console.log("Data Science");
      setLeaderboardData(data.filter((data) => data.track === `Data Science`));
    }
    if (selectedOption === "Data Analysis") {
      console.log("Data Analysis");
      setLeaderboardData(
        data.filter((data) => data.track === `Data Analytics`)
      );
    }
    if (selectedOption === "UI/UX") {
      console.log("UI/UX");
      setLeaderboardData(data.filter((data) => data.track === `UI/UX`));
    }
    if (selectedOption === "DSA") {
      console.log("DSA");
      setLeaderboardData(
        data.filter((data) => data.track === `Data Structures and Algorithms`)
      );
    }
  };

  useEffect(() => {
    handleTracks();
  }, [selectedOption]);
  //   console.log("🚀 ~ AdminsList ~ data:", data)
  const DropdownButton = () => {
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      //   handleTracks()
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative z-50" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="border border-ecx-colors-secondary-blue text-ecx-colors-secondary-blue font-semibold text-xs lg:text-base py-2 px-3.5 lg:px-5 hover:opacity-90 transition-opacity flex items-center gap-x-2"
        >
          <p>{selectedOption}</p>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 border border-ecx-colors-secondary-blue bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out origin-top w-[10rem]">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left px-3.5 py-2 text-xs lg:text-base hover:bg-ecx-colors-secondary-blue hover:text-white transition-colors duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="">
      <div className="flex justify-between items-center">
        <h1 className="font-varela-round md:text-lg lg:text-2xl">
          Leaderboard
        </h1>

        <DropdownButton />
      </div>

      <div className="mt-5">
        <div className={`flex flex-col gap-4 relative`}>
          <div className="flex flex-col gap-2.5">
            {leaderboardData?.map((dat, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 lg:grid-cols-10 px-1.5 lg:px-5 py-1.5 lg:py-1.5 gap-x-5 gap-y-7 items-center font-medium text-xs lg:text-sm border border-ecx-colors-secondary-blue`}
              >
                <div className="col-span-1">
                  <div
                    className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-[10px] lg:text-xs`}
                  >
                    <div className="h-8 w-8 rounded-full bg-ecx-colors-secondary-blue flex justify-center items-center text-white">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-3 font-semibold truncate">
                  <p>
                    {dat.firstName} {dat.lastName}
                  </p>
                </div>
                <div className="col-span-1 lg:col-span-4 flex items-end justify-start gap-x-1.5">
                  <span className="font-semibold">{dat.track}</span>
                </div>
                <div className="col-span-1 lg:col-span-2 flex items-end justify-start gap-x-1.5">
                  <span className="font-semibold">{dat.points} points</span>
                </div>
                {/* <div className='col-span-1 flex justify-center'>
                  <Image src={menuBTN} alt='menu' className='cursor-pointer' />
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
