'use client'
import FormBox from '@/components/profile/FormBox'
import FormBoxHeader from '@/components/profile/FormBoxHeader'
import FormImageInput from '@/components/profile/FormImageInput'
import FormInput from '@/components/profile/FormInput'
import React, { useState } from 'react'

const UserProfilePage = () => {
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
            <FormInput placeholder='Full Name' type='text' />
            <FormInput placeholder='Last Name' type='text' />
          </div>
          <FormInput placeholder='Email' type='email' />
          <FormInput placeholder='Password' type='password' />
        </div>
      </FormBox>
      <FormBox>
        <FormBoxHeader 
          header={`Educational`}
        />
        <div className='grid grid-cols-1 gap-y-4'>
          <FormInput type='text' placeholder={'Track --- Front end Web development'} />
          <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
            <FormInput placeholder='Department' type='text' />
            <FormInput placeholder='Faculty' type='text' />
          </div>
        </div>
      </FormBox>
      <div className='w-full max-w-[44.575rem] h-[2.625rem] lg:h-[3.625rem] text-ecx-colors-white lg:text-base text-sm font-inter tracking-widest bg-ecx-colors-secondary-blue mx-auto flex items-center justify-center cursor-pointer'>Edit Profile</div>
    </form>
  )
}

export default UserProfilePage