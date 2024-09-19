import AdminsList from '../components/main/AdminsList';
import AdminsListTableRow from '../components/main/AdminsListTableRow';
// import tableData from '../sampleData/adminList.json';
import tableData from '../sampleData/participants.json';
import menuBTN from '../../../../public/icons/eclipe.png';
import chevronDown from '../../../../public/icons/chevron-down-black.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <section className=''>
      <div className='flex justify-between items-center'>
        <h1 className='font-varela-round md:text-lg lg:text-2xl'>
          Participants
        </h1>

        <button className='border border-ecx-colors-secondary-blue text-ecx-colors-secondary-bluefont-semibold text-xs lg:text-base py-2 px-3.5 lg:px-5 hover:opacity-90 transition-opacity flex items-center gap-x-2'>
          <p>All tracks</p>
          <p className='text-[11px]'>Frontend development</p>
          <p className='text-[11px]'>Backend development</p>
          <p className='text-[11px]'>Python</p>
          <p className='text-[11px]'>Data Analytics</p>
          <p className='text-[11px]'>Data Science</p>
          <p className='text-[11px]'>Data Structures and Algorithms</p>
          <Image src={chevronDown} alt='more options' className='rotate-90' />
        </button>
      </div>

      <div className='mt-5'>
        <div className={`flex flex-col gap-4 relative`}>
          <div className='flex flex-col gap-2.5'>
            {tableData.map((data, index) => (
              <Link href='/superadmin/participants/profile'>
                <div
                  className={`grid grid-cols-12 lg:grid-cols-10 px-1.5 lg:px-5 py-1.5 lg:py-1.5 gap-x-5 gap-y-7 items-center font-medium text-xs lg:text-sm border border-ecx-colors-secondary-blue`}
                >
                  <div className='col-span-1'>
                    <div
                      className={`w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-[10px] lg:text-xs`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className='col-span-4 lg:col-span-3 font-semibold truncate'>
                    <p>{data.name}</p>
                  </div>
                  <div className='col-span-3 lg:col-span-3 flex items-end justify-start gap-x-1.5'>
                    <span className='font-semibold'>{data.track}</span>
                  </div>
                  <div className='col-span-2 lg:col-span-2 flex items-end justify-start gap-x-1.5 w-[100%]'>
                    <span className='font-semibold'>{data.score} points</span>
                  </div>
                  <div className='col-span-1 flex justify-center'>
                    <Image
                      src={menuBTN}
                      alt='menu'
                      className='cursor-pointer'
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
