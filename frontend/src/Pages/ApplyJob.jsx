import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ApplyJob = () => {

  const navigate = useNavigate();

  const {id} = useParams();

  const [job, setJob] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');

  axios.defaults.withCredentials = true;

  const applyForJob = async(e) => {
    e.preventDefault();
    seterror('');
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    if(resume){
      formData.append("resume", resume);
    };

    try {
      const response = await axios.post(`https://job-platform.up.railway.app/apply/applyForJob/${id}`, 
        formData
      );

      if(response.status === 200){
  toast.success("Job Applied Successfully");
  setName('');
  setEmail('');
  setPhoneNumber('');
  setTimeout(() => navigate('/submittedApplications'), 1500);

}

    } catch (error) {
      if (error.response && error.response.status) {
            if (error.response.status === 503) {
                toast.error("Candidate Must be loggedin!"); 
            } else if (error.response.status === 500) {
                toast.error("Failed to apply, try latter!"); 
            } 
            
            else {
                toast.error("Something went wrong");
            }
        }

        console.log(error.message);
    
      
    }
  }


  const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://job-platform.up.railway.app/jobs/viewJobs/${id}`);
            setJob(response.data);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    // if (loading) return <div>Loading...</div>

    useEffect(() => {
        fetchJobDetails();
    }, [id])


  return (
    <>
      <Header />
      <div className='w-full bg-gray-200 px-2 md:px-4 lg:px-16 py-4 md:py-2 items-start justify-start'>

        {/* For Desktop */}
        <form onSubmit={applyForJob} className='hidden min-h-screen sm:flex flex-col px-4 gap-4 py-2 rounded-lg bg-white items-center justify-start'>
          <h1 className='text-center text-2xl text-[rgb(2,6,111)] pb-2'>Apply for a Job</h1>

          <div className='w-full flex flex-col gap-3 items-start'>

            <h1 className='text-start text-xl pb-2'><span className=' font-medium'>Applying for: </span>{job.title}</h1>

          {/* First Row */}
          <div className='flex gap-14 w-full items-center justify-center'>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Candidate Name:</h1>
              <input value={name} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setName(e.target.value)} type='text' required />
            </div>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Candidate Email:</h1>
              <input value={email} className='w-full rounded-md h-8 px-2 border border-black' onChange={(e) => setEmail(e.target.value)} type='email' required />
            </div>

          </div>

          {/* Second Row */}
          <div className='flex gap-14 w-full justify-start'>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Candidate Phone Number:</h1>
              <input value={phoneNumber} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setPhoneNumber(e.target.value)} type='number' required />
            </div>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Upload Resume:</h1>
              <input className='w-full rounded-md' onChange={(e) => setResume(e.target.files[0])} 
              type='file' accept="application/pdf" required />
            </div>

          </div>

          </div>
          

         

          <div className='flex gap-6'>

          <button type='submit' className='w-24 h-10 text-white bg-[rgb(2,6,111)] hover:bg-white hover:text-[rgb(2,6,111)] cursor-pointer rounded-md'>Apply</button>
          <button onClick={() => navigate(`/job-details/${id}`)} className='w-24 h-10 hover:bg-[rgb(2,6,111)] hover:text-white border cursor-pointer text-[rgb(2,6,111)] border-[rgb(2,6,111)] rounded-md'>Back</button>

          </div>          
        </form>
        
        
        
        {/* For Mobile */}
        <form onSubmit={applyForJob} className='flex sm:hidden flex-col px-2 gap-4 py-2 rounded-lg bg-white items-center justify-center'>
          <h1 className='text-center text-xl text-[rgb(2,6,111)] pb-2'>Apply For a Job</h1>

          {/* First Row */}
          <div className='flex flex-col gap-2 w-full items-center justify-center'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Candidate Name:</h1>
              <input value={name} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setName(e.target.value)} type='text' required />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Candidate Email:</h1>
              <input value={email} className='w-full rounded-md h-8 px-2 border border-black' onChange={(e) => setEmail(e.target.value)} type='email' required />
            </div>

          </div>

          {/* Second Row */}
          <div className='flex flex-col gap-2 w-full items-center justify-center'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Candidate Phone Number:</h1>
              <input value={phoneNumber} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setPhoneNumber(e.target.value)} type='number' required />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Upload Resume:</h1>
              <input className='w-full rounded-md' onChange={(e) => setResume(e.target.files[0])} 
              type='file' accept="application/pdf" required />
            </div>


          </div>


          <div className='flex gap-4'>
          <button type='submit' className='w-24 h-10 bg-[rgb(2,6,111)] cursor-pointer text-white rounded-md hover:bg-white hover:text-[rgb(2,6,111)]'>Apply</button>
          <button onClick={() => navigate(`/job-details/${id}`)} className='w-24 h-10 border hover:text-white hover:bg-[rgb(2,6,111)] cursor-pointer text-[rgb(2,6,111)] border-[rgb(2,6,111)] rounded-md'>Back</button>
          </div>
          
        </form>

      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default ApplyJob