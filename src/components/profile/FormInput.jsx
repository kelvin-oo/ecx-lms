import React from 'react'

const FormInput = ({ placeholder, type, disabled }) => {
  return (
    <input type={type} placeholder={placeholder} disabled={disabled} className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate' />
  )
}

export default FormInput