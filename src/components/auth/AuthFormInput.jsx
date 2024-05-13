import Image from "next/image"
import { useEffect, useState } from "react";


export default function FormInput ({
  variant = "text", // text || email || password || number
  disabled = false,
  placeholder = "",
  name="",
  message = "",
  error=false,
  ...props
}) {
  const [inputState, setInputState] = useState("normal") // normal || active || error
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisible = () => setPasswordVisible(!isPasswordVisible)

  const handleClick = () => !error && setInputState("active")
  
  const handleBlur = () => !error && setInputState("normal")


  useEffect(() => {
    if (error) {
      setInputState("error")
    } else {
      setInputState("normal")
    }
  }, [error])


  const inputType = variant === "password" && !isPasswordVisible ? 
    "password" : variant === "password" && isPasswordVisible ? 
    "text" : variant


  return (
    <div
      disabled={disabled}
      className="flex items-center justify-between border-2 outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 text-base lg:text-xl placeholder:tracking-wider truncate"
    >
      <input
        name={name}
        type={inputType}
        placeholder={placeholder || ""}
        className="w-full placeholder:text-ecx-colors-black text-sm md:text-base lg:text-xl bg-transparent outline-none"
        onClick={handleClick}
        onBlur={handleBlur}
        {...props}
      />

      {variant === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisible}
          >
            {isPasswordVisible ? (
              <Image
                src="/icons/password-eyeslash.svg"
                alt="icon"
                width={18}
                height={18}
              />
            ):(
              <Image
                src="/icons/password-eye.svg"
                alt="icon"
                width={18}
                height={18}
              />
            )}
          </button>
      )}

      {message && (
        <p>{message}</p>
      )}
    </div>
  )
}