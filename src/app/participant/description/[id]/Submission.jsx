"use client"
import Link from "next/link"
import Image from "next/image"
import CountdownTimer from "@/components/common/Timer";
import ComponentLevelLoader from '@/components/Loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import { UserRole } from "@prisma/client";


export default function Submission({ data }) {
    const user = useCurrentClientUser()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState();
    const [initialData, setInitialData] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Fetch or set your initial data here
      const loadedInitialData = {
        submissionLink: data?.submissions.length > 0 ? data.submissions[0].submissionLink : undefined,
      };
      setInitialData(loadedInitialData);
      setFormData(loadedInitialData);
    }, []);
  
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      const { submissionLink } =
        formData || {};
  
      if (!submissionLink) {
        toast.error("No submission", {
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
        taskId: data.id,
        participantId: user.id
      };
  
      console.log(body)
  
      
      try {
        const res = await fetch("/api/participant/submission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (res.status === 400) {
          toast.error("Submission deadline has passed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setLoading(false);
        }
        if (res.status === 401) {
          toast.error("Error uploading submission", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setLoading(false);
        }
        if (res.status === 402) {
          toast.error("This task has already been graded. No further submissions allowed.", {
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
          toast.error("Submission not allowed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setLoading(false);
        }
        if (res.status === 404) {
          toast.error("Task not found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setLoading(false);
        }
        if (res.status === 201) {
          toast.success('Submission Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          router.push('/participant')
        }
        if (res.status === 200) {
          toast.success('Submission updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          router.push('/participant')
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

    function convertDateFormat(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`;
    }




  return(
    <div className="flex flex-col gap-6 lg:gap-10">
      <div className="flex gap-5 text-xs lg:text-base">
        <Link href="/user/" className="transition-opacity hover:opacity-50">Dashboard</Link>
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={12}
          height={5}
        />
        <Link href="/user/tasks" className="transition-opacity hover:opacity-50">Tasks</Link>
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={12}
          height={5}
        />
        <Link href="" className="transition-opacity hover:opacity-50">Description</Link>
      </div>

      <div className="grid grid-cols-6 gap-12 lg:gap-20 xl:gap-10">
        <div className="col-span-6 lg:col-span-3 xl:col-span-4 order-last lg:order-1 flex flex-col gap-4 lg:gap-8 font-varela-round">
          <h1 className="text-[18px] lg:text-2xl xl:text-3xl">{data?.title}</h1>
          <p className="text-sm lg:text-lg xl:text-xl">{data?.description}</p>
          <h1 className="lg:text-xl xl:text-2xl mt-5">Submission Details</h1>
          <p className="text-sm lg:text-lg xl:text-xl">{data?.submissionDetails}</p>
          {
            user.role === UserRole.PARTICIPANT && <input
            onChange={handleChange}
          //   disabled={true}
              type="text"
              name="submissionLink"
              className="border-2 border-ecx-colors-secondary-blue px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 xl:py-5 placeholder-black text-sm font-varela-round outline-none"
              placeholder="Paste URL link"
              defaultValue={data?.submissions.length > 0 ? data.submissions[0].submissionLink : '' }
            />
          }
          {
            user.role === UserRole.PARTICIPANT && <div className="grid grid-cols-2 w-11/12 xl:w-4/5 h-10 lg:h-14 mx-auto gap-6 xl:gap-16 justify-center text-sm lg:text-lg">
            <button onClick={handleFormSubmit} className="bg-ecx-colors-secondary-blue text-white">{loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Submit'}</button>
            <button disabled={true} className="border-2 border-ecx-colors-secondary-blue text-ecx-colors-secondary-blue">Edit Link</button>
          </div>
          }
        </div>

        <div className="col-span-6 lg:col-span-3 xl:col-span-2 lg:order-2 border lg:border-2 border-ecx-colors-secondary-blue h-fit px-5 lg:px-10 xl:px-12 py-4 lg:py-6 flex justify-between lg:flex-col lg:gap-6 text-lg lg:text-xl bg-white shadow-[4px_4px_rgba(39,46,75,1)] lg:shadow-[7px_7px_rgba(39,46,75,1)] text-center lg:text-start">
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Status</div>
            <div className="font-light text-sm lg:text-xl">{data?.submissions.length > 0 ? data.submissions[0].status : 'PENDING' }</div>
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Deadline</div>
            <CountdownTimer className="!text-center lg:!text-start font-light text-sm lg:text-xl text-red-900" date={convertDateFormat(data.deadline)} />
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-1.5 lg:gap-4">
            <div className="font-varela-round lg:font-bold">Grade</div>
            <div className="font-light text-sm lg:text-xl">{data?.taskGrade}<span className="text-xs lg:text-base"> points</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
