'use client'
import FormBox from '@/components/profile/FormBox'
import FormBoxHeader from '@/components/profile/FormBoxHeader'
import FormImageInput from '@/components/profile/FormImageInput'
import FormInput from '@/components/profile/FormInput'
import React, { useState } from 'react'

const ParticipantProfile = ({ user }) => {
  const [imgFile, setImgFile] = useState()

  function setFile(file){
    setImgFile(file)
  }
  return (
    <form className='grid grid-cols-1 gap-y-10 pb-8'>
      <FormImageInput 
        setFile={setFile}
      />
      <FormBox>
        <FormBoxHeader
          header={`Personal Information`}
        />
        <div className='grid grid-cols-1 gap-y-4'> 
          <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
            <FormInput placeholder={user?.firstName} type='text' disabled={true} />
            <FormInput placeholder={user?.lastName} type='text' disabled={true} />
          </div>
          <FormInput placeholder={user?.email} type='email' disabled={true} />
          <FormInput placeholder={user?.userName} type='text' disabled={true} />
        </div>
      </FormBox>
      <FormBox>
        <FormBoxHeader 
          header={`Educational`}
        />
        <div className='grid grid-cols-1 gap-y-4'>
          <FormInput type='text' placeholder={`Track --- ${user?.track}`} disabled={true} />
          <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
            <FormInput placeholder='Department' type='text' disabled={true} />
            <FormInput placeholder='Faculty' type='text' disabled={true} />
          </div>
        </div>
      </FormBox>
      <div className='w-full max-w-[44.575rem] h-[2.625rem] lg:h-[3.625rem] text-ecx-colors-white lg:text-base text-sm font-inter tracking-widest bg-ecx-colors-secondary-blue mx-auto flex items-center justify-center cursor-pointer'>Edit Profile</div>
    </form>
  )
}

export default ParticipantProfile