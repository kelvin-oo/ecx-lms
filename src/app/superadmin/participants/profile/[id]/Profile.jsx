"use client";
import { useQuery } from "@tanstack/react-query";
import FormBox from "@/components/profile/FormBox";
import FormBoxHeader from "@/components/profile/FormBoxHeader";
import { getUserDetailsAndTaskInfo } from "@/actions/superAdmin/super";
import Image from "next/image";

const Profile = ({ id }) => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await getUserDetailsAndTaskInfo(id);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.success;
    },
  });
  console.log("🚀 ~ Profile ~ data:", data);
  return (
    <section>
      <div className="w-full h-[200px] flex items-center justify-center relative">
      <div className='w-[108px] aspect-square rounded-full bg-ecx-colors-secondary-blue'>
        {
          data.user.image && <Image src={data?.user.image} alt="" width={500} height={500 } className="rounded-full w-[100%] h-[100%]"/>
        }
      </div>
        <button className='bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity absolute right-0 top-0'>
          Block admin
        </button>
      </div>
      <form className="grid grid-cols-1 gap-y-10 pb-8 ">
        <FormBox>
          <FormBoxHeader header={`PERSONAL INFO`} />
          <div className="grid grid-cols-1 gap-y-4">
            <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
              <div className="">
                <p>Full name</p>
                <input
                  type="text"
                  name="firstName"
                  disabled={true}
                  defaultValue={`${data?.user.firstName} ${data?.user.lastName}`}
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
              <div>
                <p>Username</p>
                <input
                  type="text"
                  defaultValue={`${data?.user.userName}`}
                  name="userName"
                  disabled={true}
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
            </div>
            <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
              <div>
                <p>Email address</p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={`${data?.user.email}`}
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
              <div>
                <p>Phone number</p>
                <input
                  type="text"
                  // defaultValue={`${data?.user.phone}`}
                  disabled={true}
                  name="userName"
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
            </div>
          </div>
        </FormBox>

        <FormBox>
          <FormBoxHeader header={`TRACK DETAILS`} />
          <div className="grid grid-cols-1 gap-y-4">
            <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
              <div className="">
                <p>Assigned Track</p>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={` ${data?.user.track}`}
                  disabled={true}
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
              <div>
                <p>Department</p>
                <input
                  type="text"
                  // placeholder={`Last Name --- ${data?.user.userName}`}
                  // defaultValue={`${data?.user.userName}`}
                  disabled={true}
                  name="lastName"
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
            </div>
            <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-8">
              <div>
                <p>Total grade</p>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={`${data?.user.points} / ${data.totalTaskGrade}`}
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
              <div>
                <p>Tasks done</p>
                <input
                  type="text"
                  defaultValue={`${data.totalTasksDone} / ${data.totalTasksInTrack}`}
                  name="userName"
                  className=" border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate"
                />
              </div>
            </div>
          </div>
        </FormBox>

        {/* <div className='w-full max-w-[44.575rem] h-[2.625rem] lg:h-[3.625rem] text-ecx-colors-white lg:text-base text-sm font-inter tracking-widest bg-ecx-colors-secondary-blue mx-auto flex items-center justify-center cursor-pointer'></div> */}
      </form>
    </section>
  );
};

export default Profile;
