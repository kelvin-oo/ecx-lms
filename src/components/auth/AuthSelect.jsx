import { useState } from "react";
import authStyles from "@/components/css/authLayout.module.css";
import Image from "next/image";

export default function AuthSelect({
  title = "",
  options = [],
  className = "",
}) {    
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => !isSelected && setIsSelected(true);

  return (
    <div
      className={`w-full flex border-2 border-black outline-none py-2 lg:py-3 px-2 lg:text-xl truncate bg-transparent relative ${className}`}
    >
      <select
        onClick={handleSelect}
        id="track"
        name="track"
        className={authStyles.auth__select}
      >
        <option disabled={isSelected} value="Track">
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <Image
        className="absolute top-1/2 right-2 -translate-y-1/2"
        src="/icons/chevron-down-black.svg"
        alt="arrow"
        width={20}
        height={20}
      />
    </div>
  );
}
