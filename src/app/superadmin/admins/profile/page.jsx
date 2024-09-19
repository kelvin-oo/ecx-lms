'use client';
import FormBox from '../../../../components/profile/FormBox';
import FormBoxHeader from '../../../../components/profile/FormBoxHeader';
import TasksTable from '@/app/superadmin/components/main/RecentTasksTable';

const EditProfile = ({ user }) => {
  return (
    <section>
      <div className='w-full h-[200px] flex items-center justify-center relative'>
        <div className='w-[108px] aspect-square rounded-full bg-ecx-colors-secondary-blue'></div>
        <button className='bg-ecx-colors-secondary-blue text-white font-semibold text-xs lg:text-base py-2.5 lg:py-3 px-3.5 lg:px-5 hover:opacity-90 transition-opacity absolute right-0 top-0'>
          Block admin
        </button>
      </div>
      <form className='grid grid-cols-1 gap-y-10 pb-8 '>
        <FormBox>
          <FormBoxHeader header={`PERSONAL INFO`} />
          <div className='grid grid-cols-1 gap-y-4'>
            <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
              <div className=''>
                <p>Full name</p>
                <input
                  type='text'
                  name='firstName'
                  placeholder={`First Name --- ${user?.fullname}`}
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
              <div>
                <p>Username</p>
                <input
                  type='text'
                  placeholder={`Last Name --- ${user?.username}`}
                  name='lastName'
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
            </div>
            <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
              <div>
                <p>Email address</p>
                <input
                  type='text'
                  disabled={true}
                  placeholder={`Email --- ${user?.email}`}
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
              <div>
                <p>Phone number</p>
                <input
                  type='text'
                  placeholder={`Username --- ${user?.userName}`}
                  name='userName'
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
            </div>
          </div>
        </FormBox>

        <FormBox>
          <FormBoxHeader header={`TRACK DETAILS`} />
          <div className='grid grid-cols-1 gap-y-4'>
            <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
              <div className=''>
                <p>Assigned Track</p>
                <input
                  type='text'
                  name='firstName'
                  placeholder={`First Name --- ${user?.fullname}`}
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
              <div>
                <p>Department</p>
                <input
                  type='text'
                  placeholder={`Last Name --- ${user?.username}`}
                  name='lastName'
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
            </div>
            <div className='grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
              <div>
                <p>Total grade</p>
                <input
                  type='text'
                  disabled={true}
                  placeholder={`Email --- ${user?.email}`}
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
              <div>
                <p>Tasks done</p>
                <input
                  type='text'
                  placeholder={`Username --- ${user?.userName}`}
                  name='userName'
                  className=' border border-solid outline-none border-ecx-colors-black w-full py-2 lg:py-3 px-3 font-inter placeholder:text-ecx-colors-black placeholder:font-inter text-base lg:text-xl placeholder:tracking-wider truncate'
                />
              </div>
            </div>
          </div>
        </FormBox>

        {/* <div className='w-full max-w-[44.575rem] h-[2.625rem] lg:h-[3.625rem] text-ecx-colors-white lg:text-base text-sm font-inter tracking-widest bg-ecx-colors-secondary-blue mx-auto flex items-center justify-center cursor-pointer'></div> */}
      </form>
      <div className='mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-2 xl:gap-x-8 xl:gap-y-7 [&>*]:bg-white [&>*]:border-[1.5px] [&>*]:border-ecx-colors-secondary-blue [&>*]:shadow-[7px_7px_rgba(39,46,75,1)] [&>*]:py-6 [&>*]:px-5'>
      <TasksTable />
      </div>
    </section>
  );
};

export default EditProfile;
