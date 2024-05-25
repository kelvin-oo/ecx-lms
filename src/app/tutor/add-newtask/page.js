'use client'

import ComponentLevelLoader from '@/components/Loader';
import { useState } from 'react';
import authStyles from '@/components/css/authLayout.module.css';
import { useRouter } from 'next/navigation';





export default function AddNewTask() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { title, description, deadline, noOfTasks } =
      formData || {};

    if (!title) {
      setError('Please fill in title');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!description) {
      setError('Please fill in description');
      setLoading(false);
      console.log(error);
      return;
    }
    if (!deadline) {
      setError('Please choose a deadline');
      setLoading(false);
      console.log(error);
      return;
    }

    if (!noOfTasks) {
      setError('Please fill choose number of tasks');
      setLoading(false);
      console.log(error);
      return;
    }

    const body = {
      ...formData,
    };

    console.log(body)

    
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        setError("Error uploading tasks");
        setLoading(false);
      }
      if (res.status === 403) {
        setError("You are not authourized to upload tasks");
        setLoading(false);
      }
      if (res.status === 200) {
        setError("");
        setSuccess('success uploading task')
        // router.push('/tutor')
      }
      if (res.status === 500) {
        setError("something went wrong");
      }
    } catch (err) {
      setError("Error, try again.");
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };



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
              onChange={handleChange}
              name='title'
            />
          </div>
        </div>
        <div className='grid gap-y-3'>
          <textarea
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3 resize-none min-h-[200px]'
            placeholder='Description'
            onChange={handleChange}
            name='description'
          />
        </div>
        <div className='grid gap-y-3'>
          <input
            type='date'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Deadline'
            onChange={handleChange}
            name='deadline'
          />
        </div>
        <div className='grid gap-y-3'>
          <input
            type='number'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Number of Tasks'
            onChange={handleChange}
            name='noOfTasks'
          />
        </div>
        {error && (
        <p className={authStyles.auth__info_text}>
          <span>{error}</span>
        </p>
      )}
      {success && (
        <p className={authStyles.auth__info_text}>
          <span>{success}</span>
        </p>
      )}
        <button onClick={handleFormSubmit} className='w-full bg-ecx-colors-secondary-blue  py-2 lg:py-3 text-white grid gap-y-3 hover justify-center'>
        {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Add Task'}
        </button>
      </div>
    </main>
  );
}
