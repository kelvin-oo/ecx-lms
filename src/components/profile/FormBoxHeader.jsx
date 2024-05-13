import React from 'react'

const FormBoxHeader = ({header}) => {
  return (
    <div className=' pb-1 border-b w-full mb-5 border-ecx-colors-black tracking-wider'>
      <h3 className=' font-normal font-varela-round text-base lg:text-2xl'>{header}</h3>
    </div>
  )
}

export default FormBoxHeader
