import Image from "next/image"
import { useState } from "react"

const SearchFrame = () => {
    const [showSearchFilter, setShowSearchFilter] = useState(false);

    const onFilterClick = () => setShowSearchFilter(!showSearchFilter) ;

   return(
    <div className=" w-full flex items-center gap-3 border-2 border-ecx-colors-black py-3 px-5 text-[#424242]" onClick={onFilterClick}>
        <div className="w-full flex gap-1">
        <Image
        className="text-ecx-colors-black"
        src="/icons/search-icon.svg"
        alt="search"
        width={24}
        height={24}
        ></Image>
        <input type="text" className="w-full outline-none placeholder: text-sm md:text-base lg:text-xl bg-transparent" placeholder="Search"/>
        </div>
        <Image
        onClick={onFilterClick}
         src="/icons/search-filter.svg"
         alt="search"
         width={24}
         height={30}
        ></Image>

        {showSearchFilter &&
        <div onClick={onFilterClick} className="flex flex-col gap-3 absolute bg-white shadow-lg -bottom-10 right-3 w-40 lg:w-50 max-w-[40vw] p-5 text-center text-xs lg:text-sm">
            <button className="outline-none">Score Range</button>
            <hr className="border-grey" />
            <button>Task Completed</button>
            <hr className="border-grey" />
        </div>
        }
    </div>
   )
}

export default SearchFrame