export default function AddNewTask() {
  return (
    <main className='grid font-varela-round text-[#424242] gap-y-6 '>
      <div className='text-base px-6'>
        <span className='text-ecx-colors-secondary-blue font-bold'>
          Add New Task
        </span>
      </div>
      <div className=' grid gap-y-6 text-base lg:text-lg  px-6 py-10'>
        <div className='grid gap-y-3'>
          <div className='flex text-[#424242] border-2 border-[#424242] px-3  py-2 lg:py-3 '>
            <input
              type='text'
              className='w-full outline-none bg-transparent '
              placeholder='Task Title'
            />
          </div>
        </div>
        <div className='grid gap-y-3'>
          <textarea
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3 resize-none min-h-[200px]'
            placeholder='Description'
          />
        </div>
        <div className='grid gap-y-3'>
          <input
            type='text'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Deadline'
          />
        </div>
        <div className='grid gap-y-3'>
          <input
            type='text'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Number of Tasks'
          />
        </div>
        <button className='w-full bg-ecx-colors-secondary-blue  py-2 lg:py-3 text-white grid gap-y-3 hover'>
          Add Task
        </button>
      </div>
    </main>
  );
}
