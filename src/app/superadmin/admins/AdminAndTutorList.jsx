'use client'
import AdminsList from '../components/main/AdminsList';

import AdminsListTableRow from '../components/main/AdminsListTableRow';
import tableData from '../sampleData/adminList.json';
import menuBTN from '../../../../public/icons/eclipe.png';
import chevronDown from '../../../../public/icons/chevron-down-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminAndTutorList() {
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
  const DropdownButton = () => {
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

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
      setSelectedOption(option);
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
      <div className="relative" ref={dropdownRef}>
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
          <div className="absolute z-50 left-0 right-0 mt-1 border border-ecx-colors-secondary-blue bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out origin-top w-[10rem]">
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
    <section className=''>
      <div className='flex justify-between items-center'>
        <h1 className='font-varela-round md:text-lg lg:text-2xl'>Admins</h1>

        <DropdownButton />
      </div>

      <div className='mt-5'>
        <div className={`flex flex-col gap-4 relative`}>
          <div className='flex flex-col gap-2.5'>
            {tableData.map(({ name, track, points }, index) => (
              <Link href='/superadmin/admins/profile' key={index}>
                <div
                  className={`grid grid-cols-12 lg:grid-cols-10 px-1.5 lg:px-5 py-1.5 lg:py-1.5 gap-x-5 gap-y-7 items-center font-medium text-xs lg:text-sm border border-ecx-colors-secondary-blue`}
                >
                  <div className='col-span-1'>
                    <div
                      className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-[10px] lg:text-xs`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className='col-span-5 lg:col-span-4 font-semibold truncate'>
                    <p>{name}</p>
                  </div>
                  <div className='col-span-1 lg:col-span-4 flex items-end justify-start gap-x-1.5'>
                    <span className='font-semibold'>{track}</span>
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Image
                      src={menuBTN}
                      alt='menu'
                      className='cursor-pointer'
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
