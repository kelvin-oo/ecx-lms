'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import ProfileAdd from '@/../public/icons/profile-add.svg'
import validateImages from '@/lib/utlisFunction/validateImages'
import { useCurrentClientUser } from '@/hooks/use-current-client-user'

const FormImageInput = ({ setFile, onImageChange, profileImage }) => {
  const user = useCurrentClientUser()
  const fileInputRef = useRef(null)
  const [PreviewImage, setPreviewImage] = useState('')

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  function handleImageChange(event) {
    const file = event.target.files && event.target.files[0];
    
    if (file && validateImages(file)) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewImage(imgUrl)
      setFile(file)
      onImageChange(event) // Call the parent's onImageChange function
    } else {
      console.log('Only jpeg, jpg, png, and gif images are allowed, and file size must not exceed the maximum limit of 1.5MB', 'error');
    }
  }

  return (
    <div className='relative w-20 h-20 lg:w-[8.3125rem] lg:h-[8.3125rem] bg-ecx-colors-black rounded-full mx-auto'>
      {
        PreviewImage ? <Image
          src={PreviewImage}
          alt='input image'
          width={133}
          height={133}
          className='rounded-full w-full h-full object-cover object-center'
        /> : <Image
        src={user.image}
        alt='input image'
        width={133}
        height={133}
        className='rounded-full w-full h-full object-cover'
      />
      }
      {/* plus icon */}
      <Image
        src={ProfileAdd}
        width={54}
        height={54}
        alt='edit'
        className='absolute bottom-0 right-0 cursor-pointer w-7 h-7 lg:w-[54px] lg:h-[54px]'
        onClick={handleButtonClick}
      />
      
      <input 
        name='image' 
        ref={fileInputRef} 
        type='file'  
        className='hidden' 
        onChange={handleImageChange}
      />
    </div>
  )
}

export default FormImageInput