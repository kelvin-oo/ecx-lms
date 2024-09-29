'use client'

import ComponentLevelLoader from '@/components/Loader';
import { useEffect, useState } from 'react';
import authStyles from '@/components/css/authLayout.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';





export default function EditTask({ id, oldData }) {
    
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatDate1 = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Fetch or set your initial data here
    const loadedInitialData = {
      title: oldData.title,
      description: oldData.description,
      deadline: oldData.deadline,
      submissionDetails: oldData.submissionDetails,
      taskGrade: oldData.taskGrade
    };
    setInitialData(loadedInitialData);
    setFormData(loadedInitialData);
  }, []);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { title, description, deadline, submissionDetails, taskGrade } =
      formData || {};

    if (!title) {
      toast.error("Please fill in title of task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      console.log(error);
      return;
    }

    if (!description) {
      toast.error("Please fill in description", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      console.log(error);
      return;
    }
    if (!deadline) {
      toast.error("Please choose a deadline", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      console.log(error);
      return;
    }

    if (!submissionDetails) {
      toast.error("Please choose number of tasks", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      console.log(error);
      return;
    }
    if (!taskGrade) {
      toast.error("Please set task grade", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      console.log(error);
      return;
    }

    

    const body = {
      ...formData,
    };

    console.log(body)

    
    try {
      const res = await fetch(`/api/admin/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        toast.error("Error updating tasks", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      }
      if (res.status === 400) {
        data = res.json()
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      }
      if (res.status === 403) {
        toast.error("You are not authourized to update tasks", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      }
      if (res.status === 200) {
        toast.success('success updating task', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push('/tutor/all-tasks')
      }
      if (res.status === 500) {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error("Error, try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
          Edit Task
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
              defaultValue={oldData.title}
            />
          </div>
        </div>
        <div className='grid gap-y-3'>
          <textarea
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3 resize-none min-h-[200px]'
            placeholder='Description'
            onChange={handleChange}
            name='description'
            defaultValue={oldData.description}
          />
        </div>
        <div className='grid gap-y-3'>
          <input
            type='date'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Deadline'
            onChange={handleChange}
            name='deadline'
            defaultValue={formatDate1(oldData.deadline)}
          />
        </div>
        <div className='grid gap-y-3'>
            Task Grade
          <input
            type='number'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3'
            placeholder='Task Grade'
            onChange={handleChange}
            name='taskGrade'
            defaultValue={oldData.taskGrade}
          />
        </div>
        <div className='grid gap-y-3'>
            <h1>Submission Details</h1>
          <input
            type='text'
            className='w-full outline-none bg-transparent border-2 border-[#424242] px-3 py-2 lg:py-3 text-black'
            placeholder={`Submission Details`}
            onChange={handleChange}
            name='submissionDetails'
            defaultValue={oldData.submissionDetails}
          />
        </div>
        
        <button onClick={handleFormSubmit} className='w-full bg-ecx-colors-secondary-blue  py-2 lg:py-3 text-white grid gap-y-3 hover justify-center'>
        {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Save Edit'}
        </button>
      </div>
    </main>
  );
}
