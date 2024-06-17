'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
const SearchFrame = () => {
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [formData, setFormData] = useState();
  const onFilterClick = () => setShowSearchFilter(!showSearchFilter);

  const router = useRouter();


 
  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  useEffect(() => {
    const addParam = () => {
      router.push(`/tutor/participant-management?search=${formData}`);
    };
    addParam();
  }, [formData]);
  return (
    <div className=" w-full flex items-center gap-3 border-2 border-ecx-colors-black py-3 px-5 text-[#424242]">
      <div className="w-full flex gap-1" onClick={onFilterClick}>
        <Image
          className="text-ecx-colors-black"
          src="/icons/search-icon.svg"
          alt="search"
          width={24}
          height={24}
        ></Image>
        <input
          type="text"
          className="w-full outline-none placeholder: text-sm md:text-base lg:text-xl bg-transparent"
          placeholder="Search"
          onChange={handleChange}
          value={formData}
        />
      </div>
      <Image
        onClick={onFilterClick}
        src="/icons/search-filter.svg"
        alt="search"
        width={24}
        height={30}
      ></Image>

      {showSearchFilter && (
        <div
          onClick={onFilterClick}
          className="flex flex-col gap-3 absolute z-[1000] bg-white shadow-lg top-[12rem] right-3 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm"
        >
          <button className="outline-none" onClick={()=>{router.push(`/tutor/participant-management?sort=score`);}}>Score Range</button>
          <hr className="border-grey" />
          <button onClick={()=>{router.push(`/tutor/participant-management?sort=task`);}}>Task Completed</button>
          <hr className="border-grey" />
        </div>
      )}
    </div>
  );
};

export default SearchFrame;
