"use client"
import { useQuery } from "@tanstack/react-query";
// import Link from "next/link"
import participantData from "../../../../sampleData/participants.json"
import { useRouter } from "next/navigation"
import { getSingleSubmission } from "@/actions/tutor/tutor";
import Link from "next/link";
import ComponentLevelLoader from '@/components/Loader';
import { useEffect, useState } from "react";
import { gradeSubmission } from "@/actions/tutor/tutor";
import { toast } from "react-toastify";
import { comment } from "postcss";
export default function Grading({id}){
    const { data, error, isLoading, isFetched } = useQuery({
        queryKey: ["submission"],
        queryFn: async () => {
          const result = await getSingleSubmission(id);
          if (result.error) {
            throw new Error(result.error);
          }
          return result;
        },
      });   
      // console.log("🚀 ~ Grading ~ data:", data)

      const [formData, setFormData] = useState();
      const [initialData, setInitialData] = useState({});
      const [loading, setLoading] = useState(false);
      const [isSelected, setIsSelected] = useState(false);
      const handleSelect = () => !isSelected && setIsSelected(true);

      useEffect(() => {
        // Fetch or set your initial data here
        const loadedInitialData = {
          comment: data?.comment,
          submissionGrade: data?.submissionGrade,
        };
        setInitialData(loadedInitialData);
        setFormData(loadedInitialData);
      }, []);
    
      const handleChange = (e) => {
        setFormData((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
    
        const { comment , submissionGrade } =
          formData || {};
    
        if (!comment) {
          toast.error("Please leave a comment", {
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
    
        if (!submissionGrade) {
          toast.error("Please grade this submission", {
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
          ...formData
        }
        // console.log(comment, id, data.task.taskGrade, submissionGrade)
        gradeSubmission(body, id, data.task.taskGrade, data.status)
          .then((submission) => {
            if (submission.success) {
              // console.log(user.success);
              toast.success('Submission Graded Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              router.back()
              return
            }
            if (submission.gradeError) {
              // console.log(user.success);
              toast.error('submission already graded', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              router.back()
              return
            }
            if (submission.mathError) {
              // console.log(user.success);
              toast.error('submission grade cannt be above task grade', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              return
            }
            toast.error('Something went wrong', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })
          .catch((error) => {
            
            toast.error('Something went wrong', {
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
            console.log('finally activated');
          });
      };

       
      const router = useRouter();
    return(
        
        <main className="grid font-varela-round text-[#424242] gap-y-6">
            <div className="text-base">
                <button onClick={() => {router.back()}} className="text-[#AAAAAA] font-bold outline-none">{data.participant.lastName} {data.participant.firstName}&nbsp;</button>
                <span className="text-ecx-colors-secondary-blue font-bold">&#12296;Grading</span>
            </div>
            <div className=" grid gap-y-6 text-base lg:text-lg border-2 border-black px-6 py-10">
                <h3 className="text-ecx-colors-secondary-blue font-bold">Participant: <span className=" font-light">{data.participant.lastName} {data.participant.firstName}</span></h3>
                <h3 className="text-ecx-colors-secondary-blue font-bold">Task: <span className="font-light">{data.task.title}</span></h3>
                <h3 className="text-ecx-colors-secondary-blue font-bold">Task Grade: <span className="font-light">{data.task.taskGrade}</span></h3>
                
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Submission</label>
                <div className="flex text-[#424242] border-2 border-[#424242] px-10 py-4 ">
                <h1><Link target="_blank" href={data.submissionLink}>{data.submissionLink}</Link></h1>
                {/* <span className="flex-end text-xs lg:text-sm">Role</span> */}
                </div>
                </div>
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Remark</label>
                <input defaultValue={data?.comment} type="text" name="comment" onChange={handleChange} className="w-full outline-none bg-transparent border-2 border-[#424242] p-4"/>
                </div>
                <div className="grid gap-y-3">
                <label className="text-ecx-colors-secondary-blue font-bold">Grade:</label>
                <input defaultValue={data?.submissionGrade} type="number" name="submissionGrade" onChange={handleChange} className="w-full outline-none bg-transparent border-2 border-[#424242] p-4"/>
                </div>
                <button onClick={handleFormSubmit} className="w-full justify-center align-middle bg-ecx-colors-secondary-blue p-4 text-white grid gap-y-3 hover"> {loading ? <ComponentLevelLoader color={'#ffffff'} /> : 'Submit'}</button>
            </div>
        </main>
    )
}