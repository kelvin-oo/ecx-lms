"use client";
import FormBox from "@/components/profile/FormBox";
import FormBoxHeader from "@/components/profile/FormBoxHeader";
import FormImageInput from "@/components/profile/FormImageInput";
import FormInput from "@/components/profile/FormInput";
import ComponentLevelLoader from '@/components/Loader';
import { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import { editParticipantProfile } from "@/actions/participants/participant";
import { useRouter } from "next/navigation";
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import { updatePassword } from "@/actions/participants/participant";

const ChangePassword = () => {
  const [imgFile, setImgFile] = useState();
  const router = useRouter()
  const session = useCurrentClientUser()

  function setFile(file) {
    setImgFile(file);
  }

  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => !isSelected && setIsSelected(true);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { previousPassword, password, confirmPassword } =
      formData || {};

if (!password) {
      toast.error("Please choose a password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }
if (!previousPassword) {
      toast.error("Please choose a password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }
if (!confirmPassword) {
      toast.error("Please choose a password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }
if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);

      return;
    }

    const body = {
      
      ...formData,
    };
    
    console.log("🚀 ~ handleFormSubmit ~ body:", body)

    updatePassword(body)
      .then((user) => {
        if (user.success) {
          console.log(user.success);
          toast.success(user.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          router.push('/participant/profile')
        }
        toast.error(user.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setLoading(false);
        console.log("finally activated");
      });
  };
  return (
    <form className="grid grid-cols-1 gap-y-10 pb-8">
      {/* <FormImageInput setFile={setFile} /> */}
      <FormBox>
        <FormBoxHeader header={`Change Password`} />
        <div className="grid grid-cols-1 gap-y-4">
          {/* <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
            //   placeholder={`First Name --- ${user?.firstName}`}
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
            <input
              type="text"
            //   placeholder={`Last Name --- ${user?.lastName}`}
              name="lastName"
              onChange={handleChange}
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
          </div> */}
          <input
            type="text"
            onChange={handleChange}
            name="previousPassword"
            placeholder={`Current Password`}
            className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
          />
          <input
            type="text"
            placeholder={`New Password`}
            name="password"
            onChange={handleChange}
            className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
          />
          <input
            type="text"
            placeholder={`Confirm New Password`}
            name="confirmPassword"
            onChange={handleChange}
            className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
          />
        </div>
      </FormBox>
      {/* <FormBox>
        <FormBoxHeader header={`Educational`} />
        <div className="grid grid-cols-1 gap-y-4">
          <input
            type="text"
            // placeholder={`Track --- ${user?.track}`}
            name="track"
            disabled={true}
            className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
          />
          <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
            <input
              type="text"
              placeholder="Department"
              name="Department"
              disabled={true}
              onChange={handleChange}
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
            <input
              type="text"
              placeholder="Faculty"
              name="Faculty"
              onChange={handleChange}
              disabled={true}
              className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
            />
          </div>
        </div>
      </FormBox> */}
      <div onClick={handleFormSubmit} className="w-full max-w-[44.575rem] h-[2.625rem] lg:h-[3.625rem] text-ecx-colors-white lg:text-base text-sm font-inter tracking-widest bg-ecx-colors-secondary-blue mx-auto flex items-center justify-center cursor-pointer">
      {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Save'}
      </div>
    </form>
  );
};

export default ChangePassword;
